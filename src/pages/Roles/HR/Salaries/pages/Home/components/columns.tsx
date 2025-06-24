import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import type { Salarie } from './SalarieTable'

export const columns: ColumnDef<Salarie>[] = [
  // id
  {
    id: 'id',
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original

      return <div className="hidden">{id.id}</div>
    },
  },
  // salarié
  {
    accessorKey: 'salarie',
    header: 'Salarié',
    filterFn: (row, columnId, filterValue) => {
      const salarie = row.getValue(columnId) as Salarie['salarie']
      const fullName = `${salarie.nom} ${salarie.prenom}`
        .toLowerCase()
        .replace(/\s+/g, ' ')
      return fullName.includes(filterValue.toLowerCase().trim())
    },
    cell: ({ row }) => {
      const salarie = row.getValue('salarie') as Salarie['salarie']
      return (
        <div className="flex items-center gap-3 justify-start">
          {/* avatar */}
          <img
            src="#"
            alt="user-avatar"
            className="size-10 min-w-10 min-h-10 rounded bg-gray-400"
          />
          {/* content */}
          <div className="flex flex-col">
            {/* full name */}
            <span className="text-sm font-bold">
              {salarie.nom} {salarie.prenom}
            </span>
            {/* email */}
            <span className="text-xs">{salarie.email}</span>
          </div>
        </div>
      )
    },
  },
  // poste
  {
    accessorKey: 'poste',
    header: 'Poste',
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <span className="text-sm text-gray-500 lowercase">
            {row.getValue('poste')}
          </span>
        </div>
      )
    },
  },
  // tel
  {
    accessorKey: 'tel',
    header: 'Téléphone',
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <span className="text-sm text-gray-500 lowercase">
            {row.getValue('tel')}
          </span>
        </div>
      )
    },
  },
  // status
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => {
      const renderStatusBg = (status: string) => {
        switch (status) {
          case 'created':
            return 'bg-green-500'
          case 'processing':
            return 'bg-yellow-500'
          case 'failed':
            return 'bg-red-500'
          case 'success':
            return 'bg-blue-500'
          default:
            return 'bg-gray-300'
        }
      }

      const status = row.getValue('status') as string

      return (
        <div className="capitalize">
          <span
            className={`text-white px-4 py-1.5 rounded text-xs ${renderStatusBg(status)}`}>
            {status}
          </span>
        </div>
      )
    },
  },
  // actions
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}>
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
