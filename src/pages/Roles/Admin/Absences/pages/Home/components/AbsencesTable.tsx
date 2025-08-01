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

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import NotFoundTable from '@/components/NotFound/NotFoundTable/NotFoundTable'

export interface IAbsence {
  id: string
  idUser: string
  typeAbsence: string
  dateDebut: string
  dateFin: string
  note: string
  statut: string
  motifDeRefus: string
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

export default function AbsencesTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [absences, setAbsences] = useState<IAbsence[]>()
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({})

  const table = useReactTable({
    data: absences ?? [],
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

  // fetch absences
  const fetchAbsences = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/absences`
      )
      console.log(response)
      setAbsences(response.data)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchAbsences()
  }, [fetchAbsences])

  return (
    <div className="w-11/12 mx-auto max-w-[1280px] pb-20">
      {/* search */}
      <div className="flex flex-wrap items-center gap-4 py-4 mb-5">
        {/* Input de recherche globale */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Salarié</span>
          <Input
            placeholder="Recherche par nom et prenom ..."
            value={(table.getColumn('user')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('user')?.setFilterValue(event.target.value)
            }
            className="min-w-[250px] h-11 bg-white"
          />
        </div>
        {/* Filtrer par statut */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Statut d'absence</span>
          <Select
            onValueChange={(value) =>
              table
                .getColumn('statut')
                ?.setFilterValue(value === 'all' ? undefined : value)
            }
            value={
              (table.getColumn('statut')?.getFilterValue() as string) ?? 'all'
            }>
            <SelectTrigger className="max-w-[200px] w-[200px] h-11 bg-white">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="en-attente">En attente</SelectItem>
              <SelectItem value="approuve">Approuvé</SelectItem>
              <SelectItem value="refuse">Refusé</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Date de début</span>
          <Input
            type="date"
            value={dateRange.from ?? ''}
            onChange={(e) => {
              const updated = { ...dateRange, from: e.target.value }
              setDateRange(updated)
              table.getColumn('dateDebut')?.setFilterValue(updated)
            }}
            className="max-w-[200px] w-[200px] h-11 bg-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Date de fin</span>
          <Input
            type="date"
            value={dateRange.to ?? ''}
            onChange={(e) => {
              const updated = { ...dateRange, to: e.target.value }
              setDateRange(updated)
              table.getColumn('dateDebut')?.setFilterValue(updated)
            }}
            className="max-w-[200px] w-[200px] h-11 bg-white"
          />
        </div>
      </div>
      {/* table */}
      {isLoading ? (
        <>Loading...</>
      ) : (
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
                  title="Absences introuvable"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, incidunt."
                />
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
      )}
    </div>
  )
}
