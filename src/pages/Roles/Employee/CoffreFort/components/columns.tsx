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
  // type
  {
    accessorKey: 'typeBulletin',
    header: 'Type',
    cell: ({ row }) => {
      const rawType = row.getValue('typeBulletin') as string | undefined

      const formatType = (type?: string) => {
        if (!type || typeof type !== 'string') return '-'
        return type
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }

      return (
        <div>
          <span className="text-sm font-medium text-black">
            {formatType(rawType)}
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
      const fileName = row.original.fichierJustificatifPdf

      return <ActionsCell fileName={fileName} />
    },
  },
]
