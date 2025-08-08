import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Table } from '@tanstack/react-table'
import { useMemo } from 'react'

interface SearchFilterProps<T> {
  table: Table<T>
}

const typeBulletinItems = [
  {
    label: 'Bulletin de salaire mensuel',
    value: 'salaire_mensuel',
  },
  {
    label: 'Prime exceptionnelle',
    value: 'prime_exceptionnelle',
  },
  {
    label: 'Indemnité de transport',
    value: 'indemnite_transport',
  },
  {
    label: 'Remboursement frais professionnels',
    value: 'remboursement_frais',
  },
  {
    label: 'Heures supplémentaires',
    value: 'heures_supplementaires',
  },
  { label: 'Bonus de performance', value: 'bonus_performance' },
  {
    label: 'Bulletin de régularisation',
    value: 'bulletin_regularisation',
  },
]

export default function SearchFilter<T>({ table }: SearchFilterProps<T>) {
  const currentYear = new Date().getFullYear()
  const yearRange = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => (currentYear - 5 + i).toString()),
    [currentYear]
  )
  return (
    <div className="w-full flex flex-wrap items-end gap-4 py-4 mb-5">
      {/* Filtrer par typeBulletin */}
      <div className="w-full lg:max-w-[200px] lg:w-[200px] flex flex-col gap-2">
        <span className="text-sm font-medium">Type</span>
        <Select
          onValueChange={(value) => {
            table
              .getColumn('typeBulletin')
              ?.setFilterValue(value === 'all' ? undefined : value)
          }}
          value={
            (table.getColumn('typeBulletin')?.getFilterValue() as string) ??
            'all'
          }>
          <SelectTrigger className="w-full h-10 bg-white">
            <SelectValue placeholder="Filtrer par type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {typeBulletinItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Filtrer par mois */}
      <div className="w-full lg:max-w-[200px] lg:w-[200px]  flex flex-col gap-2">
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
      <div className="w-full lg:max-w-[200px] lg:w-[200px]  flex flex-col gap-2">
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
    </div>
  )
}
