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
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import NotFoundTable from '@/components/NotFound/NotFoundTable/NotFoundTable'

export type ICoffreFort = {
  id: string
  idUser: string
  typeBulletin: string
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

export default function CoffreFortTable() {
  const { userDetails } = useDashboardContext()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const typeBulletinItems = [
    { label: 'Bulletin de salaire mensuel', value: 'salaire_mensuel' },
    { label: 'Prime exceptionnelle', value: 'prime_exceptionnelle' },
    { label: 'Indemnité de transport', value: 'indemnite_transport' },
    {
      label: 'Remboursement frais professionnels',
      value: 'remboursement_frais',
    },
    { label: 'Heures supplémentaires', value: 'heures_supplementaires' },
    { label: 'Bonus de performance', value: 'bonus_performance' },
    { label: 'Bulletin de régularisation', value: 'bulletin_regularisation' },
  ]

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [coffres, setCoffres] = useState<ICoffreFort[]>()

  const table = useReactTable({
    data: coffres ?? [],
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

  // fetch coffres
  const fetchCoffres = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/coffres/user/${userDetails?.id}`
      )
      console.log(response)
      setCoffres(response.data)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }, [userDetails?.id])

  useEffect(() => {
    fetchCoffres()
  }, [fetchCoffres])

  return (
    <div className="w-11/12 mx-auto max-w-[1280px] pb-20">
      {/* search */}
      <div className="flex flex-wrap items-center gap-4 py-4 mb-5">
        {/* Filtrer par typeBulletin */}
        <Select
          onValueChange={(value) => {
            table
              .getColumn('typeBulletin')
              ?.setFilterValue(value === 'all' ? undefined : value)
          }}
          value={
            (table.getColumn('typeBulletin')?.getFilterValue() as string) ??
            'all'
          }>
          <SelectTrigger className="max-w-[250px] w-[250px] h-11 bg-white">
            <SelectValue placeholder="Filtrer par type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {typeBulletinItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filtrer par année */}
        <Select
          onValueChange={(value) => {
            table
              .getColumn('annee')
              ?.setFilterValue(value === 'all' ? undefined : value)
          }}
          value={
            table.getColumn('annee')?.getFilterValue() !== undefined
              ? String(table.getColumn('annee')?.getFilterValue())
              : 'all'
          }>
          <SelectTrigger className="max-w-[200px] w-[200px] h-11 bg-white">
            <SelectValue placeholder="Filtrer par année" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
          </SelectContent>
        </Select>

        {/* Filtrer par mois */}
        <Select
          onValueChange={(value) => {
            table
              .getColumn('mois')
              ?.setFilterValue(value === 'all' ? undefined : value)
          }}
          value={
            (table.getColumn('mois')?.getFilterValue() as string) ?? 'all'
          }>
          <SelectTrigger className="max-w-[200px] w-[200px] h-11 bg-white">
            <SelectValue placeholder="Filtrer par mois" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {[
              'Janvier',
              'Février',
              'Mars',
              'Avril',
              'Mai',
              'Juin',
              'Juillet',
              'Août',
              'Septembre',
              'Octobre',
              'Novembre',
              'Décembre',
            ].map((mois) => (
              <SelectItem key={mois} value={mois}>
                {mois}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
                      <TableHead key={header.id} className="py-6">
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
                  title="Coffre fort introuvable"
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
