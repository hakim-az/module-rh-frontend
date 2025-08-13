import type { ColumnDef } from '@tanstack/react-table'
import type { ICoffreFort } from './CoffreFortTable'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { CircleUserRound, MessageCircleMoreIcon } from 'lucide-react'

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
