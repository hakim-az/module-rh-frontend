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
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/absences`
  )
  return response.data
}

export default function AbsencesTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // ✅ useQuery to fetch absences
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
      {isLoading ? (
        <div className="text-center py-10 text-muted-foreground">
          Chargement...
        </div>
      ) : isError ? (
        <div className="text-center py-10 text-red-500">
          Une erreur est survenue lors du chargement des absences.
        </div>
      ) : (
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
                  title="Absences introuvables"
                  content="Aucune absence trouvée pour l'utilisateur sélectionné."
                />
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {table.getRowModel().rows?.length ? (
            <div className="flex items-center justify-center py-8">
              <TablePagination table={table} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
