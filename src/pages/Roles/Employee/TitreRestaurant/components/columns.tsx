import type { ColumnDef } from '@tanstack/react-table'

import type { ITitreRestau } from './TitreRestaurantTable'
import ActionsCell from './ActionsCell'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { MessageCircleMoreIcon } from 'lucide-react'

export const columns: ColumnDef<ITitreRestau>[] = [
  // id
  {
    accessorKey: 'id',
    enableHiding: false,
    header: () => null,
    cell: () => null,
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
  // Nbr de jours ouvrès
  {
    accessorKey: 'nbrJours',
    header: 'Nbr de jours ouvrès',
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black font-medium">
            {row.getValue('nbrJours')}
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
        <>
          {row.getValue('note') === '' ? (
            <MessageCircleMoreIcon
              className="opacity-20 cursor-not-allowed"
              size={24}
            />
          ) : (
            <HoverCard>
              <HoverCardTrigger className="flex cursor-pointer font-medium items-center justify-start gap-3">
                <MessageCircleMoreIcon
                  className="hover:text-blue-500"
                  size={24}
                />
              </HoverCardTrigger>
              <HoverCardContent>{row.getValue('note')}</HoverCardContent>
            </HoverCard>
          )}
        </>
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
