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
import type { DashboardData } from '../../../Accueil'
import { useNavigate } from 'react-router-dom'
import NotFoundTable from '@/components/NotFound/NotFoundTable/NotFoundTable'

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
}

export default function TitreRestaurantTable({ dashboardData }: IProps) {
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
          className="bg-blue-500 text-white px-6 py-1.5 rounded">
          Voir tout
        </button>
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          {/* Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="py-5 lg:px-">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          {/* Data */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
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
              <NotFoundTable
                columns={columns.length}
                title="Titre restaurant introuvable"
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, incidunt."
              />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
