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
import { columns } from './columns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { DashboardData } from '../../../Accueil'
import { useNavigate } from 'react-router-dom'
import NotFoundTable from '@/components/NotFound/NotFoundTable/NotFoundTable'
import { ChevronRight } from 'lucide-react'

interface IProps {
  dashboardData: DashboardData | undefined
}

export default function SalarieTable({ dashboardData }: IProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const navigate = useNavigate()

  const table = useReactTable({
    data: dashboardData?.latest.users || [],
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
    <div>
      <div className="w-full flex items-center justify-between mb-6">
        <span className="text-xl font-semibold">Salariés</span>
        <button
          type="button"
          onClick={() => navigate('salariés')}
          className="flex items-center justify-center gap-3 bg-[#1E3A8A] text-white px-5 py-2 rounded hover:scale-110 transition-all ease-in-out delay-75">
          Voir tout <ChevronRight className="w-5" />
        </button>
      </div>
      <div className="rounded-md border bg-white min-h-[350px]">
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
                title="Salarié introuvable"
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, incidunt."
              />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
