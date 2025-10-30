import type { ColumnDef } from '@tanstack/react-table'
import ActionsCell from './ActionsCell'
import type { User } from '@/types/user.types'
import { CircleUserRound } from 'lucide-react'

const renderStatusBg = (statut: string) => {
  switch (statut) {
    case 'user-registred':
      return '#9CA3AF'
    case 'profile-completed':
      return '#3B82F6'
    case 'contract-uploaded':
      return '#FBBF24'
    case 'email-sent':
      return '#6366F1'
    case 'contract-signed':
      return '#EC4899'
    case 'user-approuved':
      return '#10B981'
    case 'user-banned':
      return '#f00'
    default:
      return '#000000'
  }
}

const getShortStatusFR = (statut: string) => {
  switch (statut) {
    case 'user-registred':
      return 'Compte créé'
    case 'profile-completed':
      return 'Formulaire complété'
    case 'contract-uploaded':
      return 'Contrat prêt'
    case 'email-sent':
      return 'Email envoyé'
    case 'contract-signed':
      return 'Contrat signé'
    case 'user-approuved':
      return 'Online'
    case 'user-banned':
      return 'Désactiver'
    default:
      return '-'
  }
}

export const columns: ColumnDef<User>[] = [
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
    header: 'Collaborateurs',
    accessorFn: (row) =>
      `${row.nomDeNaissance} ${row.prenom} ${row.emailPersonnel}`,
    filterFn: (row, columnId, filterValue) => {
      const fullName = (row.getValue(columnId) as string)
        .toLowerCase()
        .replace(/\s+/g, ' ')
      return fullName.includes(filterValue.toLowerCase().trim())
    },
    cell: ({ row }) => {
      const avatar = row.original.avatar
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
              {row.original.nomDeNaissance} {row.original.prenom}
            </span>
            <span className="text-xs">{row.original.emailPersonnel}</span>
          </div>
        </div>
      )
    },
  },
  // Agence
  {
    id: 'poste',
    header: 'Agence',
    accessorFn: (row) => row.contrat?.poste,
    cell: ({ row }) => {
      const poste = row.original.contrat?.poste
      console.log(poste)

      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black">Test</span>
        </div>
      )
    },
  },
  // Role
  {
    id: 'poste',
    header: 'Role',
    accessorFn: (row) => row.contrat?.poste,
    cell: ({ row }) => {
      const poste = row.original.contrat?.poste
      console.log(poste)
      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black">VRP</span>
        </div>
      )
    },
  },

  // Micrososft
  {
    accessorKey: 'statut',
    header: 'MS365',
    cell: ({ row }) => {
      const statut = row.getValue('statut') as string

      return (
        <div className="capitalize">
          <span
            style={{ backgroundColor: renderStatusBg(statut) }}
            className="text-white px-3 inline-block text-center py-1.5 rounded text-[10px]">
            {getShortStatusFR(statut)}
          </span>
        </div>
      )
    },
  },

  // Winlead
  {
    accessorKey: 'statut',
    header: 'WLD',
    cell: ({ row }) => {
      const statut = row.getValue('statut') as string

      return (
        <div className="capitalize">
          <span
            style={{ backgroundColor: renderStatusBg(statut) }}
            className="text-white px-3 inline-block text-center py-1.5 rounded text-[10px]">
            {getShortStatusFR(statut)}
          </span>
        </div>
      )
    },
  },

  // Mondial TV
  {
    accessorKey: 'statut',
    header: 'MTV',
    cell: ({ row }) => {
      const statut = row.getValue('statut') as string

      return (
        <div className="capitalize">
          <span
            style={{ backgroundColor: renderStatusBg(statut) }}
            className="text-white px-3 inline-block text-center py-1.5 rounded text-[10px]">
            {getShortStatusFR(statut)}
          </span>
        </div>
      )
    },
  },

  // Plénitude
  {
    accessorKey: 'statut',
    header: 'PLN',
    cell: ({ row }) => {
      const statut = row.getValue('statut') as string

      return (
        <div className="capitalize">
          <span
            style={{ backgroundColor: renderStatusBg(statut) }}
            className="text-white px-3 inline-block text-center py-1.5 rounded text-[10px]">
            {getShortStatusFR(statut)}
          </span>
        </div>
      )
    },
  },

  // OHM Energie
  {
    accessorKey: 'statut',
    header: 'OHM',
    cell: ({ row }) => {
      const statut = row.getValue('statut') as string

      return (
        <div className="capitalize">
          <span
            style={{ backgroundColor: renderStatusBg(statut) }}
            className="text-white px-3 inline-block text-center py-1.5 rounded text-[10px]">
            {getShortStatusFR(statut)}
          </span>
        </div>
      )
    },
  },

  // ECA
  {
    accessorKey: 'statut',
    header: 'ECA',
    cell: ({ row }) => {
      const statut = row.getValue('statut') as string

      return (
        <div className="capitalize">
          <span
            style={{ backgroundColor: renderStatusBg(statut) }}
            className="text-white px-3 inline-block text-center py-1.5 rounded text-[10px]">
            {getShortStatusFR(statut)}
          </span>
        </div>
      )
    },
  },

  // Neoliane
  {
    accessorKey: 'statut',
    header: 'NEO',
    cell: ({ row }) => {
      const statut = row.getValue('statut') as string

      return (
        <div className="capitalize">
          <span
            style={{ backgroundColor: renderStatusBg(statut) }}
            className="text-white px-3 inline-block text-center py-1.5 rounded text-[10px]">
            {getShortStatusFR(statut)}
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
      const id = row.getValue('id') as string
      const statut = row.getValue('statut') as string

      return <ActionsCell id={id} statut={statut} />
    },
  },
]
