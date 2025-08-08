import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Table } from '@tanstack/react-table'

interface SearchFilterProps<T> {
  table: Table<T>
}

export default function SearchFilter<T>({ table }: SearchFilterProps<T>) {
  const navigate = useNavigate()

  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({})
  return (
    <div className="flex flex-wrap items-end gap-4 py-4 mb-5">
      {/* type */}
      <div className="flex flex-col gap-2 w-full md:max-w-[200px] md:w-[200px]">
        <span className="text-sm font-medium">Type d'absence</span>
        <Select
          onValueChange={(value) =>
            table
              .getColumn('typeAbsence')
              ?.setFilterValue(value === 'all' ? undefined : value)
          }
          value={
            (table.getColumn('typeAbsence')?.getFilterValue() as string) ??
            'all'
          }>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Filtrer par type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>

            {/* Groupe 1 */}
            <div className="px-3 py-1 text-xs text-muted-foreground">
              🛡 Absences légales / réglementaires
            </div>
            <SelectItem value="conges_payes">Congés payés (CP)</SelectItem>
            <SelectItem value="conges_sans_solde">Congés sans solde</SelectItem>
            <SelectItem value="conge_maternite">Congé maternité</SelectItem>
            <SelectItem value="conge_paternite">
              Congé paternité / second parent
            </SelectItem>
            <SelectItem value="conge_parental">
              Congé parental d’éducation
            </SelectItem>
            <SelectItem value="conge_adoption">Congé adoption</SelectItem>
            <SelectItem value="conge_maladie">
              Congé maladie / arrêt maladie
            </SelectItem>
            <SelectItem value="conge_longue_maladie">
              Congé longue maladie / longue durée
            </SelectItem>
            <SelectItem value="accident_travail">
              Accident du travail / maladie professionnelle
            </SelectItem>
            <SelectItem value="conge_formation">Congé de formation</SelectItem>
            <SelectItem value="conge_evenement_familial">
              Congé pour événements familiaux
            </SelectItem>
            <SelectItem value="conge_sabbatique">Congé sabbatique</SelectItem>
            <SelectItem value="conge_solidarite_familiale">
              Congé de solidarité familiale
            </SelectItem>
            <SelectItem value="conge_creation_entreprise">
              Congé pour création d’entreprise
            </SelectItem>
            <SelectItem value="conge_proche_aidant">
              Congé de proche aidant
            </SelectItem>

            {/* Groupe 2 */}
            <div className="px-3 py-1 text-xs text-muted-foreground mt-2">
              ⏱ Gestion du temps de travail
            </div>
            <SelectItem value="repos_compensateur">
              Repos compensateur de remplacement
            </SelectItem>
            <SelectItem value="jours_rtt">Jours RTT</SelectItem>
            <SelectItem value="absence_injustifiee">
              Absence injustifiée / non autorisée
            </SelectItem>
            <SelectItem value="retard">Retard</SelectItem>
            <SelectItem value="repos_hebdomadaire">
              Repos hebdomadaire / jours fériés
            </SelectItem>
            <SelectItem value="absence_partielle">
              Absence partielle (ex : demi-journée)
            </SelectItem>
            <SelectItem value="teletravail">Télétravail</SelectItem>

            {/* Groupe 3 */}
            <div className="px-3 py-1 text-xs text-muted-foreground mt-2">
              🏢 Absences spécifiques à l’entreprise
            </div>
            <SelectItem value="conges_exceptionnels">
              Congés exceptionnels supplémentaires
            </SelectItem>
            <SelectItem value="jour_pont">Jour de pont offert</SelectItem>
            <SelectItem value="absence_deplacement">
              Absence pour mission / déplacement
            </SelectItem>
            <SelectItem value="absence_medicale">
              Absence pour rendez-vous médical
            </SelectItem>
            <SelectItem value="absence_syndicale">
              Absence syndicale / délégation
            </SelectItem>
            <SelectItem value="absence_greve">Absence pour grève</SelectItem>
            <SelectItem value="absence_don_jours">
              Absence pour don de jours
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* date de début */}
      <div className="flex flex-col gap-2 w-full md:max-w-[180px] md:w-[180px]">
        <span className="text-sm font-medium">Date de début</span>
        <Input
          type="date"
          value={dateRange.from ?? ''}
          onChange={(e) => {
            const updated = { ...dateRange, from: e.target.value }
            setDateRange(updated)
            table.getColumn('dateDebut')?.setFilterValue(updated)
          }}
          className="h-10 bg-white"
        />
      </div>
      {/* date de fin */}
      <div className="flex flex-col gap-2 w-full md:max-w-[180px] md:w-[180px]">
        <span className="text-sm font-medium">Date de fin</span>
        <Input
          type="date"
          value={dateRange.to ?? ''}
          onChange={(e) => {
            const updated = { ...dateRange, to: e.target.value }
            setDateRange(updated)
            table.getColumn('dateDebut')?.setFilterValue(updated)
          }}
          className="h-10 bg-white"
        />
      </div>
      {/* statut */}
      <div className="flex flex-col gap-2 w-full md:max-w-[180px] md:w-[180px]">
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
          <SelectTrigger className="w-full bg-white">
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
      {/* action btn */}
      <Button
        type="button"
        variant="default"
        size="lg"
        onClick={() => navigate('demander-une-absence')}
        className="ml-auto w-full md:max-w-[200px] md:w-[200px] mt-5 lg:mt-0 ">
        Demander une absence
      </Button>
    </div>
  )
}
