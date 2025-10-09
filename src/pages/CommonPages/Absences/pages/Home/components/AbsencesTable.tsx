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
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { columns } from './columns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import NotFoundTable from '@/components/NotFound/NotFoundTable/NotFoundTable'
import TablePagination from '@/components/TablePagination/TablePagination'
import SearchFilter from './SearchFilter'
import type { IAbsence } from '@/types/tables/rh'

// 👇 Query function
const fetchAbsences = async (): Promise<IAbsence[]> => {
  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/absences`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}

export default function AbsencesTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // ✅ Fetch data using React Query
  const {
    data: absences = [],
    isLoading,
    isError,
  } = useQuery<IAbsence[]>({
    queryKey: ['absences'],
    queryFn: fetchAbsences,
  })

  const table = useReactTable({
    data: absences,
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
    <div className="w-11/12 mx-auto max-w-[1280px] pb-20">
      {/* Search Filter */}
      <SearchFilter table={table} />

      {/* Table */}
      <div className="rounded-md border bg-white min-h-[350px] flex flex-col items-center justify-between">
        <Table>
          {/* Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="py-5">
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
                    Une erreur est survenue lors du chargement des absences.
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
                title="Absences introuvables"
                content="Aucune absence trouvée pour l'utilisateur sélectionné."
              />
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {!isLoading && !isError && table.getRowModel().rows?.length ? (
          <div className="flex items-center justify-center py-8">
            <TablePagination table={table} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
