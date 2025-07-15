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
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'

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
}

export default function AbsencesTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [absences, setAbsences] = useState<IAbsence[]>([])
  const [fetchError, setFetchError] = useState<string | null>(null)

  const navigate = useNavigate()

  const table = useReactTable({
    data: absences,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
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

  const fetchAbsences = useCallback(async () => {
    try {
      setIsLoading(true)
      setFetchError(null)
      const response = await axios.get('http://localhost:3000/absences')
      setAbsences(response.data ?? [])
    } catch (error) {
      console.error(error)
      setFetchError('Une erreur est survenue lors du chargement des absences.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAbsences()
  }, [fetchAbsences])

  return (
    <div className="w-11/12 mx-auto max-w-[1280px] pb-20">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 py-4 mb-5">
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

        <Input
          type="date"
          value={
            (table.getColumn('dateDebut')?.getFilterValue() as string) ?? ''
          }
          onChange={(e) =>
            table.getColumn('dateDebut')?.setFilterValue(e.target.value)
          }
          className="max-w-[200px] h-11 bg-white"
        />

        <Input
          type="date"
          value={(table.getColumn('dateFin')?.getFilterValue() as string) ?? ''}
          onChange={(e) =>
            table.getColumn('dateFin')?.setFilterValue(e.target.value)
          }
          className="max-w-[200px] h-11 bg-white"
        />

        <Button
          type="button"
          variant="default"
          size="lg"
          onClick={() => navigate('demander-une-absence')}
          className="ml-auto">
          Demander une absence
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-80">
            <LoadingSpinner />
          </div>
        ) : fetchError ? (
          <div className="text-center py-20 text-red-500 font-medium">
            {fetchError}
          </div>
        ) : absences.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Aucune absence enregistrée.
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
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
              <TableBody>
                {table.getRowModel().rows.length ? (
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
                      Aucun résultat trouvé pour les filtres sélectionnés.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-center py-8">
              <nav className="flex items-center space-x-1 text-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}>
                  <span className="sr-only">Previous</span>
                  <span className="text-gray-500">{'<'}</span>
                </Button>

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

                  return pages.map((page, idx) => {
                    if (page === 'dots') {
                      const key = `dots-${pages[idx - 1]}-${pages[idx + 1]}`
                      return (
                        <span
                          key={`dots-${key}`}
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
          </>
        )}
      </div>
    </div>
  )
}
