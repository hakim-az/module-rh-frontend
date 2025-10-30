import { Input } from '@/components/ui/input'
import type { Table } from '@tanstack/react-table'

interface SearchFilterProps<T> {
  table: Table<T>
}

export default function SearchFilter<T>({ table }: SearchFilterProps<T>) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-4 mb-5">
      <div className="w-full lg:min-w-[250px] lg:w-[250px] flex flex-col gap-2">
        <span className="text-sm font-medium">Salarié</span>
        <Input
          placeholder="Recherche par nom et prénom ..."
          value={(table.getColumn('salarie')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('salarie')?.setFilterValue(event.target.value)
          }
          className="w-full h-10 bg-white"
        />
      </div>
    </div>
  )
}
