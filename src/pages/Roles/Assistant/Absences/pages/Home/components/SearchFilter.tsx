import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Table } from '@tanstack/react-table'
import { useState } from 'react'

interface SearchFilterProps<T> {
  table: Table<T>
}

export default function SearchFilter<T>({ table }: SearchFilterProps<T>) {
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({})
  return (
    <div className="flex flex-wrap items-center gap-4 py-4 mb-5">
      {/* Input de recherche globale */}
      <div className="w-full lg:min-w-[250px] lg:w-[250px] flex flex-col gap-2">
        <span className="text-sm font-medium">Salarié</span>
        <Input
          placeholder="Recherche par nom et prenom ..."
          value={(table.getColumn('user')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('user')?.setFilterValue(event.target.value)
          }
          className="w-full h-11 bg-white"
        />
      </div>
      {/* Filtrer par statut */}
      <div className="w-full lg:min-w-[250px] lg:w-[250px]  flex flex-col gap-2">
        <span className="text-sm font-medium">Statut d'absence</span>
        <Select
          onValueChange={(value) =>
            table
              .getColumn('statut')
              ?.setFilterValue(value === 'all' ? undefined : value)
          }
          value={
            (table.getColumn('statut')?.getFilterValue() as string) ?? 'all'
          }>
          <SelectTrigger className="w-full h-11 bg-white">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="en-attente">En attente</SelectItem>
            <SelectItem value="approuve">Approuvé</SelectItem>
            <SelectItem value="refuse">Refusé</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full lg:min-w-[250px] lg:w-[250px]  flex flex-col gap-2">
        <span className="text-sm font-medium">Date de début</span>
        <Input
          type="date"
          value={dateRange.from ?? ''}
          onChange={(e) => {
            const updated = { ...dateRange, from: e.target.value }
            setDateRange(updated)
            table.getColumn('dateDebut')?.setFilterValue(updated)
          }}
          className="w-full h-11 bg-white"
        />
      </div>

      <div className="w-full lg:min-w-[250px] lg:w-[250px]  flex flex-col gap-2">
        <span className="text-sm font-medium">Date de fin</span>
        <Input
          type="date"
          value={dateRange.to ?? ''}
          onChange={(e) => {
            const updated = { ...dateRange, to: e.target.value }
            setDateRange(updated)
            table.getColumn('dateDebut')?.setFilterValue(updated)
          }}
          className="w-full h-11 bg-white"
        />
      </div>
    </div>
  )
}
