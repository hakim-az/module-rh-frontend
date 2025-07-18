import DisplayInput from '@/components/DisplayInput/DisplayInput'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'

export default function InfosPerso() {
  // salarie details context
  const { salarieDetails, isLoadingSalarieDetails } = useSalarieDetailsContext()
  return (
    <>
      {isLoadingSalarieDetails ? (
        <div className="w-full bg-white h-80 flex items-center justify-center border border-gray-300 rounded-md shadow">
          <LoadingSpinner />
        </div>
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
              value={salarieDetails?.civilite ?? '-'}
            />
            {/* Prénom */}
            <DisplayInput
              label="Prénom"
              value={salarieDetails?.prenom ?? '-'}
            />
            {/* Nom de naissance */}
            <DisplayInput
              label="Nome de naissance"
              value={salarieDetails?.nomDeNaissance ?? '-'}
            />
            {/* Nom usuel */}
            <DisplayInput
              label="Nom usuel"
              value={salarieDetails?.nomUsuel ?? '-'}
            />
            {/* Situation familiale */}
            <DisplayInput
              label="Situation familiale"
              value={salarieDetails?.situationFamiliale ?? '-'}
            />
            {/* Numéro de sécurité sociale */}
            <DisplayInput
              label="Numéro de sécurité sociale"
              value={salarieDetails?.numeroSecuriteSociale ?? '-'}
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
              value={salarieDetails?.naissance.dateDeNaissance ?? '-'}
            />
            {/* Pays de naissance */}
            <DisplayInput
              label="Pays de naissance"
              value={salarieDetails?.naissance.paysDeNaissance ?? '-'}
            />
            {/* Départmemnt de naissance */}
            <DisplayInput
              label="Départmemnt de naissance"
              value={salarieDetails?.naissance.departementDeNaissance ?? '-'}
            />
            {/* commune de naissance */}
            <DisplayInput
              label="commune de naissance"
              value={salarieDetails?.naissance.communeDeNaissance ?? '-'}
            />
            {/* Pays de nationalité */}
            <DisplayInput
              label="Pays de nationalité"
              value={salarieDetails?.naissance.paysDeNationalite ?? '-'}
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
              value={salarieDetails?.emailPersonnel ?? '-'}
            />
            {/* E-mail professionnel */}
            <DisplayInput
              label="E-mail professionnel"
              value={salarieDetails?.emailProfessionnel ?? '-'}
            />
            {/* Téléphone portable personnelle */}
            <DisplayInput
              label="Téléphone portable personnelle"
              value={salarieDetails?.telephonePersonnel ?? '-'}
            />
            {/* Téléphone portable professionnel */}
            <DisplayInput
              label="Téléphone portable professionnel"
              value={salarieDetails?.telephoneProfessionnel ?? '-'}
            />
            {/* adresse */}
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Adresse :
            </span>
            {/* Pays */}
            <DisplayInput
              label="Pays"
              value={salarieDetails?.adresse.pays ?? '-'}
            />
            {/* Code postal */}
            <DisplayInput
              label="Code postal"
              value={salarieDetails?.adresse.codePostal ?? '-'}
            />
            {/* Ville */}
            <DisplayInput
              label="Ville"
              value={salarieDetails?.adresse.ville ?? '-'}
            />
            {/* Adresse */}
            <DisplayInput
              label="Adresse"
              value={salarieDetails?.adresse.adresse ?? '-'}
            />
            {/* Complément d'adresse */}
            <DisplayInput
              label="Complément d'adresse"
              value={salarieDetails?.adresse.complementAdresse ?? '-'}
            />
          </div>
        </section>
      )}{' '}
    </>
  )
}
