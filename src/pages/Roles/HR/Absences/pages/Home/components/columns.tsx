import type { ColumnDef } from '@tanstack/react-table'

import type { IAbsence } from './AbsencesTable'
import ActionsCell from './ActionsCell'

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
    id: 'salarie',
    header: 'Salarié',
    accessorFn: (row) =>
      `${row.salarie.nom} ${row.salarie.prenom} ${row.salarie.email}`,
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
            {row.original.salarie.nom} {row.original.salarie.prenom}
          </span>
          <span className="text-xs">{row.original.salarie.email}</span>
        </div>
      </div>
    ),
  },
  // type
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black">
            {row.getValue('type') ? row.getValue('type') : '-'}
          </span>
        </div>
      )
    },
  },
  // Date début
  {
    accessorKey: 'date_debut',
    header: 'Date début',
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black">
            {row.getValue('date_debut') ? row.getValue('date_debut') : '-'}
          </span>
        </div>
      )
    },
  },
  // Date fin
  {
    accessorKey: 'date_fin',
    header: 'Date fin',
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black">
            {row.getValue('date_fin') ? row.getValue('date_fin') : '-'}
          </span>
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
  // actions
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.getValue('id') as string
      const statut = row.getValue('statut') as string
      // const status = row.getValue('status') as string

      // Extract step number from "step-1" to "step-5"
      // const stepNumber = parseInt(status.replace('step-', ''), 10)

      return <ActionsCell id={id} statut={statut} />
    },
  },
]
