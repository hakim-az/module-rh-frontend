import * as React from 'react'
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
import { ChevronDown } from 'lucide-react'
import { columns } from './columns'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { data } from './data'

export type Salarie = {
  id: string
  salarie: {
    nom: string
    prenom: string
    email: string
  }
  poste: string
  tel: string
  status: 'created' | 'contract-uploaded' | 'contreact-signed' | 'approved'
}

export default function SalarieTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
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
      {/* search */}
      <div className="flex items-center py-4 mb-5">
        <Input
          placeholder="Recherche par nom et prenom ..."
          value={(table.getColumn('salarie')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('salarie')?.setFilterValue(event.target.value)
          }
          className="max-w-sm h-11 bg-white"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto bg-white h-11">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* table */}
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
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-80 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* Pagination */}
        {table.getRowModel().rows?.length ? (
          <div className="flex items-center justify-center py-8">
            <nav className="flex items-center space-x-1 text-sm">
              {/* Previous */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}>
                <span className="sr-only">Previous</span>
                <span className="text-gray-500">{'<'}</span>
              </Button>

              {/* Page Numbers with Ellipses */}
              {(() => {
                const pageCount = table.getPageCount()
                const currentPage = table.getState().pagination.pageIndex
                const pages: (number | 'dots')[] = []

                if (pageCount <= 4) {
                  for (let i = 0; i < pageCount; i++) pages.push(i)
                } else {
                  if (currentPage <= 1) {
                    pages.push(0, 1, 2, 'dots', pageCount - 1)
                  } else if (currentPage >= pageCount - 2) {
                    pages.push(
                      0,
                      'dots',
                      pageCount - 3,
                      pageCount - 2,
                      pageCount - 1
                    )
                  } else {
                    pages.push(
                      0,
                      'dots',
                      currentPage,
                      currentPage + 1,
                      'dots',
                      pageCount - 1
                    )
                  }
                }

                return pages.map((page) => {
                  if (page === 'dots') {
                    return (
                      <span
                        key={`dots-${Math.random()}`}
                        className="px-2 text-gray-500">
                        ...
                      </span>
                    )
                  }

                  const isActive = page === currentPage
                  return (
                    <Button
                      key={page}
                      variant={isActive ? 'outline' : 'ghost'}
                      className={`h-8 w-8 p-0 ${isActive ? 'font-bold' : ''}`}
                      onClick={() => table.setPageIndex(page)}>
                      {page + 1}
                    </Button>
                  )
                })
              })()}

              {/* Next */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}>
                <span className="sr-only">Next</span>
                <span className="text-gray-500">{'>'}</span>
              </Button>
            </nav>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
