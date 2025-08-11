import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Table } from '@tanstack/react-table'
import { CircleFadingPlus } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchFilterProps<T> {
  table: Table<T>
}

export default function SearchFilter<T>({ table }: SearchFilterProps<T>) {
  const navigate = useNavigate()

  const currentYear = new Date().getFullYear()
  const yearRange = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => (currentYear - 5 + i).toString()),
    [currentYear]
  )
  return (
    <div className="flex flex-wrap items-end gap-4 py-4 mb-5">
      {/* Input de recherche globale */}
      <div className="w-full lg:w-[250px] flex flex-col gap-2">
        <span className="text-sm font-medium">Salarié</span>
        <Input
          placeholder="Recherche par nom et prénom ..."
          value={(table.getColumn('user')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('user')?.setFilterValue(event.target.value)
          }
          className="w-full h-11 bg-white"
        />
      </div>

      {/* Filtrer par mois */}
      <div className="w-full lg:w-[180px] flex flex-col gap-2">
        <span className="text-sm font-medium">Mois</span>
        <Select
          onValueChange={(value) => {
            table
              .getColumn('mois')
              ?.setFilterValue(value === 'all' ? undefined : value)
          }}
          value={
            (table.getColumn('mois')?.getFilterValue() as string) ?? 'all'
          }>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Filtrer par mois" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {[
              'Janvier',
              'Février',
              'Mars',
              'Avril',
              'Mai',
              'Juin',
              'Juillet',
              'Aout',
              'Septembre',
              'Octobre',
              'Novembre',
              'Décembre',
            ].map((mois) => (
              <SelectItem key={mois} value={mois}>
                {mois}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Filtrer par année */}
      <div className="w-full lg:w-[180px] flex flex-col gap-2">
        <span className="text-sm font-medium">Année</span>
        <Select
          onValueChange={(value) => {
            table
              .getColumn('annee')
              ?.setFilterValue(value === 'all' ? undefined : value)
          }}
          value={
            table.getColumn('annee')?.getFilterValue() !== undefined
              ? String(table.getColumn('annee')?.getFilterValue())
              : 'all'
          }>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Filtrer par année" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            {yearRange.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* deamnder une absence */}
      <Button
        type="button"
        variant="default"
        size={'lg'}
        onClick={() => navigate('ajouter-un-titre-restaurant')}
        className="ml-auto bg-[#4141D2] w-full mt-5 lg:mt-0 lg:min-w-[200px] lg:w-[220px] gap-3">
        Ajouter un titre restaurant <CircleFadingPlus />
      </Button>
    </div>
  )
}
