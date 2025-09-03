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
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import NotFoundTable from '@/components/NotFound/NotFoundTable/NotFoundTable'
import TablePagination from '@/components/TablePagination/TablePagination'
import SearchFilter from './SearchFilter'

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
  total: number
  createdAt: string
  updatedAt: string
}

export default function AbsencesTable() {
  const { userDetails } = useDashboardContext()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [absences, setAbsences] = useState<IAbsence[]>([])

  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

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

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/absences/user/${userDetails?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setAbsences(response.data ?? [])
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [token, userDetails?.id])

  useEffect(() => {
    fetchAbsences()
  }, [fetchAbsences])

  return (
    <div className="w-11/12 mx-auto max-w-[1280px] pb-20">
      {/* Search Filter */}
      <SearchFilter table={table} />
      {/* Table */}
      <div className="rounded-md border bg-white ">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-80">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="h-full min-h-[350px] flex flex-col items-center justify-between">
            <Table>
              {/* Header */}
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="py-6">
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
                  <NotFoundTable
                    columns={columns.length}
                    title="Absence introuvable"
                    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, incidunt."
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
    </div>
  )
}
