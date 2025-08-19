import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Table } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'

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
      {/* Filtrer par statut */}
      <div className="w-full lg:min-w-[250px] lg:w-[250px]  flex flex-col gap-2">
        <span className="text-sm font-medium">Statut</span>
        <Select
          onValueChange={(value) => {
            // Si "all", on reset le filtre (undefined)
            table
              .getColumn('statut')
              ?.setFilterValue(value === 'all' ? undefined : value)
          }}
          value={
            (table.getColumn('statut')?.getFilterValue() as string) ?? 'all'
          }>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="user-registred">Compte créé</SelectItem>
            <SelectItem value="profile-completed">
              Formulaire complété
            </SelectItem>
            <SelectItem value="contract-uploaded">Contrat prêt</SelectItem>
            <SelectItem value="email-sent">Email envoyé</SelectItem>
            <SelectItem value="contract-signed">Contrat signé</SelectItem>
            <SelectItem value="user-approuved">Accès validé</SelectItem>
            <SelectItem value="user-banned">Utilisateur banner</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DropdownMenu>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
