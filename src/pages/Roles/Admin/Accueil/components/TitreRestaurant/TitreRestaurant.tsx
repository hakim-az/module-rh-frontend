import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table'
import { columns } from './columns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useState } from 'react'
import type { DashboardData } from '../../Accueil'
import { useNavigate } from 'react-router-dom'
import NotFoundTable from '@/components/NotFound/NotFoundTable/NotFoundTable'
import { ChevronRight } from 'lucide-react'

export type ITitreRestau = {
  id: string
  idUser: string
  nbrJours: string
  mois: string
  annee: string
  note: string
  fichierJustificatifPdf: string
  createdAt: string
  updatedAt: string
  user: {
    nomDeNaissance: string
    prenom: string
    emailProfessionnel: string
    avatar: string
  }
}

interface IProps {
  dashboardData: DashboardData | undefined
  isLoading: boolean
  isError: boolean
}

export default function TitreRestaurantTable({
  dashboardData,
  isLoading,
  isError,
}: IProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const navigate = useNavigate()

  const table = useReactTable({
    data: dashboardData?.latest.restaus ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  })

  return (
    <div>
      <div className="w-full flex items-center justify-between mb-6">
        <span className="text-xl font-semibold">Titre restaurant</span>
        <button
          type="button"
          onClick={() => navigate('titre-restaurant')}
          className="flex items-center justify-center gap-3 bg-[#1B86CB] text-white px-5 py-2 rounded hover:scale-110 transition-all ease-in-out delay-75">
          Voir tout <ChevronRight className="w-5" />
        </button>
      </div>
      <div className="rounded-md border bg-white min-h-[350px]">
        <Table>
          {/* Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="py-5 lg:px-">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* Body */}
          <TableBody>
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={`skeleton-${idx}`}>
                  {columns.map((col) => (
                    <TableCell key={col.id} className="py-6">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isError ? (
              // Error row
              <TableRow>
                <TableCell colSpan={columns.length} className="h-[300px]">
                  <div className="flex items-center justify-center w-full h-full text-red-500 text-xl">
                    Une erreur est survenue lors du chargement des titres
                    restaurant.
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              // Data rows
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // Not found
              <NotFoundTable
                columns={columns.length}
                title="Titre restaurant introuvable"
                content="Aucun titre restaurant n'a été trouvé."
              />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
