import type { ColumnDef } from '@tanstack/react-table'

import type { ITitreRestau } from './TitreRestaurantTable'
import ActionsCell from './ActionsCell'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Info } from 'lucide-react'

export const columns: ColumnDef<ITitreRestau>[] = [
  // id
  {
    accessorKey: 'id',
    enableHiding: false,
    header: () => null,
    cell: () => null,
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
  // Nbr de jours ouvrès
  {
    accessorKey: 'nbr_jr',
    header: 'Nbr de jours ouvrès',
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black">
            {row.getValue('nbr_jr')}
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
