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
