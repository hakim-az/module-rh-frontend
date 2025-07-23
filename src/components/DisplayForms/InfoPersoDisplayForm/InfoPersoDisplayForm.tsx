import DisplayInput from '@/components/DisplayInput/DisplayInput'
import { formatDateToLabel } from '@/lib/formatDate'
import { getCountryLabel } from '@/lib/getCountryLabel'
import type { User } from '@/types/user.types'

interface IProps {
  details: User | undefined
  loading: boolean
}

export default function InfoPersoDispalyForm({ details, loading }: IProps) {
  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <section className="w-full mx-auto gap-10 flex flex-col ">
          {/* identité */}
          <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Identité :
            </span>
            {/* civilité */}
            <DisplayInput label="Civilité" value={details?.civilite ?? '-'} />
            {/* Prénom */}
            <DisplayInput label="Prénom" value={details?.prenom ?? '-'} />
            {/* Nom de naissance */}
            <DisplayInput
              label="Nome de naissance"
              value={details?.nomDeNaissance ?? '-'}
            />
            {/* Nom usuel */}
            <DisplayInput label="Nom usuel" value={details?.nomUsuel ?? '-'} />
            {/* Situation familiale */}
            <DisplayInput
              label="Situation familiale"
              value={details?.situationFamiliale ?? '-'}
            />
            {/* Numéro de sécurité sociale */}
            <DisplayInput
              label="Numéro de sécurité sociale"
              value={details?.numeroSecuriteSociale ?? '-'}
            />
          </div>
          {/* Naissance et nationalité : */}
          <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Naissance et nationalité :
            </span>
            {/* Date de naissance */}
            <DisplayInput
              label="Date de naissance"
              value={
                formatDateToLabel(details?.naissance?.dateDeNaissance) ?? '-'
              }
            />
            {/* Pays de naissance */}
            <DisplayInput
              label="Pays de naissance"
              value={getCountryLabel(details?.naissance.paysDeNaissance) ?? '-'}
            />
            {/* Départmemnt de naissance */}
            <DisplayInput
              label="Départmemnt de naissance"
              value={details?.naissance.departementDeNaissance ?? '-'}
            />
            {/* commune de naissance */}
            <DisplayInput
              label="commune de naissance"
              value={details?.naissance.communeDeNaissance ?? '-'}
            />
            {/* Pays de nationalité */}
            <DisplayInput
              label="Pays de nationalité"
              value={getCountryLabel(details?.naissance.paysDeNaissance)}
            />
          </div>
          {/* coordonnées & adresse */}
          <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Coordonnées :
            </span>
            {/* E-mail personnelle */}
            <DisplayInput
              label="E-mail personnelle"
              value={details?.emailPersonnel ?? '-'}
            />
            {/* E-mail professionnel */}
            <DisplayInput
              label="E-mail professionnel"
              value={details?.emailProfessionnel ?? '-'}
            />
            {/* Téléphone portable personnelle */}
            <DisplayInput
              label="Téléphone portable personnelle"
              value={details?.telephonePersonnel ?? '-'}
            />
            {/* Téléphone portable professionnel */}
            <DisplayInput
              label="Téléphone portable professionnel"
              value={details?.telephoneProfessionnel ?? '-'}
            />
            {/* adresse */}
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Adresse :
            </span>
            {/* Pays */}
            <DisplayInput
              label="Pays"
              value={getCountryLabel(details?.adresse.pays)}
            />
            {/* Code postal */}
            <DisplayInput
              label="Code postal"
              value={details?.adresse.codePostal ?? '-'}
            />
            {/* Ville */}
            <DisplayInput label="Ville" value={details?.adresse.ville ?? '-'} />
            {/* Adresse */}
            <DisplayInput
              label="Adresse"
              value={details?.adresse.adresse ?? '-'}
            />
            {/* Complément d'adresse */}
            <DisplayInput
              label="Complément d'adresse"
              value={details?.adresse.complementAdresse ?? '-'}
            />
          </div>
        </section>
      )}
    </>
  )
}
