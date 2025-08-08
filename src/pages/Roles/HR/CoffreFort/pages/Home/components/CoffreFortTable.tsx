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
import type { ICoffreFort } from '@/types/tables/rh'

// 👇 Query function
const fetchCoffres = async (): Promise<ICoffreFort[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/coffres`
  )
  return response.data
}

export default function CoffreFortTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const {
    data: coffres = [],
    isLoading,
    isError,
  } = useQuery<ICoffreFort[]>({
    queryKey: ['coffres'],
    queryFn: fetchCoffres,
  })

  const table = useReactTable({
    data: coffres,
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
          Une erreur est survenue lors du chargement des données.
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
                  title="Coffre fort introuvable"
                  content="Aucune donnée trouvée pour les coffres forts."
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
