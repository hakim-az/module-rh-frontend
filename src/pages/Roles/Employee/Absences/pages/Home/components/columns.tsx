import type { ColumnDef } from '@tanstack/react-table'

import type { IAbsence } from './AbsencesTable'
import ActionsCell from './ActionsCell'
import { formatDateToLabel } from '@/lib/formatDate'

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
      const raw = row.getValue('dateDebut') as string
      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black">
            {formatDateToLabel(raw)}
          </span>
        </div>
      )
    },
    // 🔥 Ajout du filtre par plage de dates
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId) as string
      const date = new Date(value)
      const from = filterValue?.from ? new Date(filterValue.from) : null
      const to = filterValue?.to ? new Date(filterValue.to) : null

      if (from && to) return date >= from && date <= to
      if (from) return date >= from
      if (to) return date <= to
      return true
    },
  },
  // Date fin
  {
    accessorKey: 'dateFin',
    header: 'Date fin',
    cell: ({ row }) => {
      const raw = row.getValue('dateFin') as string

      return (
        <div className="capitalize">
          <span className="text-sm capitalize text-black">
            {formatDateToLabel(raw)}
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
