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
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import NotFoundTable from '@/components/NotFound/NotFoundTable/NotFoundTable'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import TablePagination from '@/components/TablePagination/TablePagination'
import SearchFilter from './SearchFilter'

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

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [coffres, setCoffres] = useState<ICoffreFort[]>()

  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

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
        `${import.meta.env.VITE_API_BASE_URL}/coffres/user/${userDetails?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response)
      setCoffres(response.data)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }, [token, userDetails?.id])

  useEffect(() => {
    fetchCoffres()
  }, [fetchCoffres])

  return (
    <div className="w-11/12 mx-auto max-w-[1280px] pb-20">
      {/* Search Filter */}
      <SearchFilter table={table} />
      {/* table */}
      {isLoading ? (
        <div className="flex bg-white items-center justify-center w-full h-80 rounded border">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between rounded-md border bg-white min-h-[350px] ">
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
                  content="Aucun coffre-fort correspondant n'a été trouvé."
                />
              )}
            </TableBody>
          </Table>
          {/* Pagination */}
          {table.getRowModel().rows?.length ? (
            <div className="flex items-center justify-center py-8">
              <nav className="flex items-center space-x-1 text-sm">
                <TablePagination table={table} />
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
