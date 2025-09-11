import type { ColumnDef } from '@tanstack/react-table'
import type { IAbsence } from './Absences'
import { CircleUserRound } from 'lucide-react'

export const columns: ColumnDef<IAbsence>[] = [
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
    accessorKey: 'typeAbsence',
    header: 'Type',
    cell: ({ row }) => {
      const rawType = row.getValue('typeAbsence') as string | undefined

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
  // Date début
  {
    accessorKey: 'dateDebut',
    header: 'Date début',
    cell: ({ row }) => {
      const raw = row.getValue('dateDebut') as string | Date | undefined
      const formattedDate = raw ? new Date(raw).toISOString().slice(0, 10) : '-'

      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black">{formattedDate}</span>
        </div>
      )
    },
  },
  // Date fin
  {
    accessorKey: 'dateFin',
    header: 'Date fin',
    cell: ({ row }) => {
      const raw = row.getValue('dateFin') as string | Date | undefined
      const formattedDate = raw ? new Date(raw).toISOString().slice(0, 10) : '-'

      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black">{formattedDate}</span>
        </div>
      )
    },
  },

  // statut
  {
    accessorKey: 'statut',
    header: 'Statut',
    cell: ({ row }) => {
      const renderStatusBg = (status: string) => {
        switch (status) {
          case 'en-attente':
            return '#333333'
          case 'approuver':
            return '#38D9A9'
          case 'refuser':
            return '#EE1D52'
          default:
            return '#000000'
        }
      }

      const statut = row.getValue('statut') as string

      return (
        <div className="capitalize">
          <span
            style={{ backgroundColor: renderStatusBg(statut) }}
            className="text-white w-28 inline-block text-center py-1.5 rounded text-xs">
            {statut}
          </span>
        </div>
      )
    },
  },
]
