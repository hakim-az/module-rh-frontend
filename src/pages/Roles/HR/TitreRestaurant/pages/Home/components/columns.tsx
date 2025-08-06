import type { ColumnDef } from '@tanstack/react-table'
import type { ITitreRestau } from './TitreRestaurantTable'
import ActionsCell from './ActionsCell'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { CircleUserRound, MessageCircleMoreIcon } from 'lucide-react'

export const columns: ColumnDef<ITitreRestau>[] = [
  // id
  {
    accessorKey: 'id',
    enableHiding: false,
    header: () => null,
    cell: () => null,
  },
  // salarié
  {
    id: 'user',
    header: 'Salarié',
    accessorFn: (row) =>
      `${row.user.nomDeNaissance} ${row.user.prenom} ${row.user.emailProfessionnel}`,
    filterFn: (row, columnId, filterValue) => {
      const fullName = (row.getValue(columnId) as string)
        .toLowerCase()
        .replace(/\s+/g, ' ')
      return fullName.includes(filterValue.toLowerCase().trim())
    },
    cell: ({ row }) => {
      const avatar = row.original.user.avatar
      return (
        <div className="flex items-center gap-3 justify-start">
          {avatar === '' ? (
            <CircleUserRound width={40} height={40} />
          ) : (
            <img
              src={avatar}
              alt="user-avatar"
              className="size-10 min-w-10 min-h-10 rounded bg-white border border-gray-300"
            />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-bold">
              {row.original.user.nomDeNaissance} {row.original.user.prenom}
            </span>
            <span className="text-xs">
              {row.original.user.emailProfessionnel}
            </span>
          </div>
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
  // Nbr de jours ouvrés
  {
    accessorKey: 'nbrJours',
    header: 'Nbr de jours ouvrés',
    cell: ({ row }) => {
      return (
        <span className="text-sm font-medium text-black">
          {row.getValue('nbrJours')}
        </span>
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
      const id = row.getValue('id') as string

      return <ActionsCell id={id} />
    },
  },
]
