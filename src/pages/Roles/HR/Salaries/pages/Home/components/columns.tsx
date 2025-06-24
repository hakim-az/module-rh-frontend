import type { ColumnDef } from '@tanstack/react-table'

import type { Salarie } from './SalarieTable'
import ActionsCell from './ActionsCell'

export const columns: ColumnDef<Salarie>[] = [
  // id
  {
    accessorKey: 'id',
    enableHiding: false,
    header: () => null,
    cell: () => null,
  },
  // salarié
  {
    accessorKey: 'salarie',
    header: 'Salarié',
    filterFn: (row, columnId, filterValue) => {
      const salarie = row.getValue(columnId) as Salarie['salarie']
      const fullName = `${salarie.nom} ${salarie.prenom}`
        .toLowerCase()
        .replace(/\s+/g, ' ')
      return fullName.includes(filterValue.toLowerCase().trim())
    },
    cell: ({ row }) => {
      const salarie = row.getValue('salarie') as Salarie['salarie']
      return (
        <div className="flex items-center gap-3 justify-start">
          {/* avatar */}
          <img
            src="#"
            alt="user-avatar"
            className="size-10 min-w-10 min-h-10 rounded bg-gray-400"
          />
          {/* content */}
          <div className="flex flex-col">
            {/* full name */}
            <span className="text-sm font-bold">
              {salarie.nom} {salarie.prenom}
            </span>
            {/* email */}
            <span className="text-xs">{salarie.email}</span>
          </div>
        </div>
      )
    },
  },
  // poste
  {
    accessorKey: 'poste',
    header: 'Poste',
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black">
            {row.getValue('poste')}
          </span>
        </div>
      )
    },
  },
  // tel
  {
    accessorKey: 'tel',
    header: 'Téléphone',
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <span className="text-sm text-black lowercase">
            {row.getValue('tel')}
          </span>
        </div>
      )
    },
  },
  // status
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => {
      const renderStatusBg = (status: string) => {
        switch (status) {
          case 'created':
            return 'bg-green-500' // Vert = nouveau, ok
          case 'approved':
            return 'bg-blue-500' // Bleu = validé, stable
          case 'contract-uploaded':
            return 'bg-yellow-500' // Jaune = en attente / envoyé
          case 'contract-signed':
            return 'bg-purple-500' // Violet = finalisé / signé
          default:
            return 'bg-gray-300' // Gris = inconnu / neutre
        }
      }

      const getShortStatusFR = (status: string) => {
        switch (status) {
          case 'created':
            return 'Créé' // Created
          case 'approved':
            return 'Validé' // Approved
          case 'contract-uploaded':
            return 'Envoyé' // Uploaded
          case 'contract-signed':
            return 'Signé' // Signed
          default:
            return 'Inconnu' // Unknown
        }
      }

      const status = row.getValue('status') as string

      return (
        <div className="capitalize">
          <span
            className={`text-white w-28 inline-block text-center py-1.5 rounded text-xs ${renderStatusBg(status)}`}>
            {getShortStatusFR(status)}
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
      return <ActionsCell id={id} />
    },
  },
]
