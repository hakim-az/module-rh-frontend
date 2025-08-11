import type { ColumnDef } from '@tanstack/react-table'
import type { ICoffreFort } from './CoffreFortTable'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { MessageCircleMoreIcon } from 'lucide-react'

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
]
