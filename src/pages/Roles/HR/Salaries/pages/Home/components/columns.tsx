import type { ColumnDef } from '@tanstack/react-table'

import type { ISalarie } from './SalarieTable'
import ActionsCell from './ActionsCell'

export const columns: ColumnDef<ISalarie>[] = [
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
    accessorFn: (row) => `${row.nomDeNaissance} ${row.prenom} ${row.emailPro}`,
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
          <span className="text-xs">{row.original.emailPerso}</span>
        </div>
      </div>
    ),
  },
  // poste
  {
    accessorKey: 'poste',
    header: 'Poste',
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black">
            {row.getValue('poste') ? row.getValue('poste') : '-'}
          </span>
        </div>
      )
    },
  },
  // tel
  {
    accessorKey: 'telPerso',
    header: 'Téléphone',
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <span className="text-sm text-black lowercase">
            {row.getValue('telPerso')}
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
          case 'step-1':
            return '#9CA3AF'
          case 'step-2':
            return '#3B82F6'
          case 'step-3':
            return '#FBBF24'
          case 'step-4':
            return '#EC4899'
          case 'step-5':
            return '#10B981'
          default:
            return '#000000'
        }
      }

      const getShortStatusFR = (status: string) => {
        switch (status) {
          case 'step-1':
            return 'Compte créé'
          case 'step-2':
            return 'Formulaire reçu'
          case 'step-3':
            return 'Contrat prêt'
          case 'step-4':
            return 'Contrat signé'
          case 'step-5':
            return 'Accès validé'
          default:
            return '-'
        }
      }

      const status = row.getValue('status') as string

      return (
        <div className="capitalize">
          <span
            style={{ backgroundColor: renderStatusBg(status) }}
            className="text-white w-28 inline-block text-center py-1.5 rounded text-xs">
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
