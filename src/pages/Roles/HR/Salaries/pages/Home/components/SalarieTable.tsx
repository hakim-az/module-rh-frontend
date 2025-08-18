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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import type { User } from '@/types/user.types'
import NotFoundTable from '@/components/NotFound/NotFoundTable/NotFoundTable'
import TablePagination from '@/components/TablePagination/TablePagination'
import SearchFilter from './SearchFilter'
import { columns } from './columns'

// 👇 Fetcher function
const fetchSalaries = async (): Promise<User[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`)
  return response.data.data
}

export default function SalarieTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // 👇 Fetch data using React Query
  const {
    data: salaries = [],
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ['salaries'],
    queryFn: fetchSalaries,
  })

  const table = useReactTable({
    data: salaries,
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
      <SearchFilter table={table} />

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
              Array.from({ length: 8 }).map((_, idx) => (
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
                    Une erreur est survenue lors du chargement des salariés.
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
                title="Salarié introuvable"
                content="Aucun salarié ne correspond à vos critères."
              />
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {!isLoading && !isError && <TablePagination table={table} />}
      </div>
    </div>
  )
}
