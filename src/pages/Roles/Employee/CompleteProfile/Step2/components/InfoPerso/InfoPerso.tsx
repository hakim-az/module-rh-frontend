import DisplayInput from '@/components/DisplayInput/DisplayInput'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { getCountryLabel } from '@/lib/getCountryLabel'

export default function InfoPerso() {
  const { userDetails, isLoadingUser } = useDashboardContext()

  return (
    <>
      {isLoadingUser ? (
        <>Loading...</>
      ) : (
        <section className="w-full mx-auto gap-10 flex flex-col ">
          {/* identité */}
          <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Identité :
            </span>
            {/* civilité */}
            <DisplayInput
              label="Civilité"
              value={userDetails?.civilite ?? '-'}
            />
            {/* Prénom */}
            <DisplayInput label="Prénom" value={userDetails?.prenom ?? '-'} />
            {/* Nom de naissance */}
            <DisplayInput
              label="Nome de naissance"
              value={userDetails?.nomDeNaissance ?? '-'}
            />
            {/* Nom usuel */}
            <DisplayInput
              label="Nom usuel"
              value={userDetails?.nomUsuel ?? '-'}
            />
            {/* Situation familiale */}
            <DisplayInput
              label="Situation familiale"
              value={userDetails?.situationFamiliale ?? '-'}
            />
            {/* Numéro de sécurité sociale */}
            <DisplayInput
              label="Numéro de sécurité sociale"
              value={userDetails?.numeroSecuriteSociale ?? '-'}
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
              value={userDetails?.naissance.dateDeNaissance ?? '-'}
            />
            {/* Pays de naissance */}
            <DisplayInput
              label="Pays de naissance"
              value={userDetails?.naissance.paysDeNaissance ?? '-'}
            />
            {/* Départmemnt de naissance */}
            <DisplayInput
              label="Départmemnt de naissance"
              value={userDetails?.naissance.departementDeNaissance ?? '-'}
            />
            {/* commune de naissance */}
            <DisplayInput
              label="commune de naissance"
              value={userDetails?.naissance.communeDeNaissance ?? '-'}
            />
            {/* Pays de nationalité */}
            <DisplayInput
              label="Pays de nationalité"
              value={getCountryLabel(userDetails?.naissance.paysDeNaissance)}
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
              value={userDetails?.emailPersonnel ?? '-'}
            />
            {/* E-mail professionnel */}
            <DisplayInput
              label="E-mail professionnel"
              value={userDetails?.emailProfessionnel ?? '-'}
            />
            {/* Téléphone portable personnelle */}
            <DisplayInput
              label="Téléphone portable personnelle"
              value={userDetails?.telephonePersonnel ?? '-'}
            />
            {/* Téléphone portable professionnel */}
            <DisplayInput
              label="Téléphone portable professionnel"
              value={userDetails?.telephoneProfessionnel ?? '-'}
            />
            {/* adresse */}
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Adresse :
            </span>
            {/* Pays */}
            <DisplayInput
              label="Pays"
              value={getCountryLabel(userDetails?.adresse.pays)}
            />
            {/* Code postal */}
            <DisplayInput
              label="Code postal"
              value={userDetails?.adresse.codePostal ?? '-'}
            />
            {/* Ville */}
            <DisplayInput
              label="Ville"
              value={userDetails?.adresse.ville ?? '-'}
            />
            {/* Adresse */}
            <DisplayInput
              label="Adresse"
              value={userDetails?.adresse.adresse ?? '-'}
            />
            {/* Complément d'adresse */}
            <DisplayInput
              label="Complément d'adresse"
              value={userDetails?.adresse.complementAdresse ?? '-'}
            />
          </div>
        </section>
      )}
    </>
  )
}
