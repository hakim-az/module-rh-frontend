import type { ColumnDef } from '@tanstack/react-table'
import ActionsCell from './ActionsCell'
import type { User } from '@/types/user.types'

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
    header: 'Salarié',
    accessorFn: (row) =>
      `${row.nomDeNaissance} ${row.prenom} ${row.emailProfessionnel}`,
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
            {row.original.nomDeNaissance} {row.original.prenom}
          </span>
          <span className="text-xs">{row.original.emailProfessionnel}</span>
        </div>
      </div>
    ),
  },
  // poste
  {
    id: 'poste',
    header: 'Poste',
    accessorFn: (row) => row.contrat?.poste,
    cell: ({ row }) => {
      const poste = row.original.contrat?.poste
      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black">
            {poste ? poste : '-'}
          </span>
        </div>
      )
    },
  },
  // matricule
  {
    id: 'matricule',
    header: 'Matricule',
    accessorFn: (row) => row.contrat?.matricule,
    cell: ({ row }) => {
      const matricule = row.original.contrat?.matricule
      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black">
            {matricule ? matricule : '-'}
          </span>
        </div>
      )
    },
  },
  // tel
  {
    accessorKey: 'telephoneProfessionnel',
    header: 'Téléphone',
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <span className="text-sm text-black lowercase">
            {row.getValue('telephoneProfessionnel')}
          </span>
        </div>
      )
    },
  },
  // status
  {
    accessorKey: 'statut',
    header: 'Statut',
    cell: ({ row }) => {
      const renderStatusBg = (statut: string) => {
        switch (statut) {
          case 'user-created':
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
          default:
            return '#000000'
        }
      }

      const getShortStatusFR = (statut: string) => {
        switch (statut) {
          case 'user-created':
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
            return 'Accès validé'
          default:
            return '-'
        }
      }

      const statut = row.getValue('statut') as string

      return (
        <div className="capitalize">
          <span
            style={{ backgroundColor: renderStatusBg(statut) }}
            className="text-white w-32 inline-block text-center py-1.5 rounded text-xs">
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
