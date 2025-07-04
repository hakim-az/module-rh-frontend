import type { ColumnDef } from '@tanstack/react-table'

import type { ICoffreFort } from './CoffreFortTable'
import ActionsCell from './ActionsCell'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Info } from 'lucide-react'

export const columns: ColumnDef<ICoffreFort>[] = [
  // id
  {
    accessorKey: 'id',
    enableHiding: false,
    header: () => null,
    cell: () => null,
  },
  // salarié
  {
    id: 'salarie',
    header: 'Salarié',
    accessorFn: (row) =>
      `${row.salarie.nom} ${row.salarie.prenom} ${row.salarie.email}`,
    filterFn: (row, columnId, filterValue) => {
      const fullName = (row.getValue(columnId) as string)
        .toLowerCase()
        .replace(/\s+/g, ' ')
      return fullName.includes(filterValue.toLowerCase().trim())
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-3 justify-start">
        <img
          src="#"
          alt="user-avatar"
          className="size-10 min-w-10 min-h-10 rounded bg-gray-400"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold">
            {row.original.salarie.nom} {row.original.salarie.prenom}
          </span>
          <span className="text-xs">{row.original.salarie.email}</span>
        </div>
      </div>
    ),
  },
  // type
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black">
            {row.getValue('type') ? row.getValue('type') : '-'}
          </span>
        </div>
      )
    },
  },
  // Année
  {
    accessorKey: 'annee',
    header: 'Année',
    filterFn: 'equals',
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black">
            {row.getValue('annee')}
          </span>
        </div>
      )
    },
  },
  // Mois
  {
    accessorKey: 'mois',
    header: 'Mois',
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black">
            {row.getValue('mois')}
          </span>
        </div>
      )
    },
  },
  // Note
  {
    accessorKey: 'note',
    header: 'Note',
    cell: ({ row }) => {
      return (
        <HoverCard>
          <HoverCardTrigger className="flex cursor-pointer font-medium items-center justify-start gap-2">
            Note <Info className="text-yellow-500" size={18} />
          </HoverCardTrigger>
          <HoverCardContent>{row.getValue('note')}</HoverCardContent>
        </HoverCard>
      )
    },
  },
  // actions
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.getValue('id') as string

      return <ActionsCell id={id} />
    },
  },
]
