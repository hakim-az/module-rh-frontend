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
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
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

export default function TitreRestaurantTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [restaux, setRestaux] = useState<ITitreRestau[]>()

  const table = useReactTable({
    data: restaux ?? [],
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

  const currentYear = new Date().getFullYear()
  const yearRange = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => (currentYear - 5 + i).toString()),
    [currentYear]
  )

  // fetch absences
  const fetchRestaux = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/restaux`
      )
      console.log(response)
      setRestaux(response.data)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchRestaux()
  }, [fetchRestaux])

  return (
    <div className="w-11/12 mx-auto max-w-[1280px] pb-20">
      {/* search */}
      <div className="flex flex-wrap items-end gap-4 py-4 mb-5">
        {/* Input de recherche globale */}
        <div className="w-full lg:w-[250px] flex flex-col gap-2">
          <span className="text-sm font-medium">Salarié</span>
          <Input
            placeholder="Recherche par nom et prénom ..."
            value={(table.getColumn('user')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('user')?.setFilterValue(event.target.value)
            }
            className="w-full h-11 bg-white"
          />
        </div>

        {/* Filtrer par mois */}
        <div className="w-full lg:w-[180px] flex flex-col gap-2">
          <span className="text-sm font-medium">Mois</span>
          <Select
            onValueChange={(value) => {
              table
                .getColumn('mois')
                ?.setFilterValue(value === 'all' ? undefined : value)
            }}
            value={
              (table.getColumn('mois')?.getFilterValue() as string) ?? 'all'
            }>
            <SelectTrigger className="w-full bg-white">
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

        {/* Filtrer par année */}
        <div className="w-full lg:w-[180px] flex flex-col gap-2">
          <span className="text-sm font-medium">Année</span>
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
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Filtrer par année" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              {yearRange.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* deamnder une absence */}
        <Button
          type="button"
          variant="default"
          size={'lg'}
          onClick={() => navigate('ajouter-un-titre-restaurant')}
          className="ml-auto w-full lg:w-[200px] mt-5 lg:mt-0">
          Ajouter un titre restaurant
        </Button>
      </div>

      {/* table */}
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className="rounded-md border bg-white min-w-[350px] flex flex-col items-center justify-between">
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
