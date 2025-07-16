import DisplayInput from '@/components/DisplayInput/DisplayInput'
import ProfileBanner from './components/ProfileBanner'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

export interface UserData {
  id: string
  role: string
  statut: string
  civilite: string
  prenom: string
  nomDeNaissance: string
  nomUsuel: string
  situationFamiliale: string
  numeroSecuriteSociale: string
  emailPersonnel: string
  emailProfessionnel: string
  telephonePersonnel: string
  telephoneProfessionnel: string
  avatar: string
  createdAt: string
  updatedAt: string
  naissance: {
    id: string
    idUser: string
    dateDeNaissance: string
    paysDeNaissance: string
    departementDeNaissance: string
    communeDeNaissance: string
    paysDeNationalite: string
    createdAt: string
    updatedAt: string
  }
  adresse: {
    id: string
    idUser: string
    pays: string
    codePostal: string
    ville: string
    adresse: string
    complementAdresse: string
    domiciliteHorsLaFrance: string
    createdAt: string
    updatedAt: string
  }
  paiement: {
    id: string
    idUser: string
    iban: string
    bic: string
    createdAt: string
    updatedAt: string
  }
  urgence: {
    id: string
    idUser: string
    nomComplet: string
    lienAvecLeSalarie: string
    telephone: string
    createdAt: string
    updatedAt: string
  }
  justificatif: {
    id: string
    idUser: string
    fichierCarteVitalePdf: string
    fichierRibPdf: string
    fichierPieceIdentitePdf: string
    fichierJustificatifDomicilePdf: string
    createdAt: string
    updatedAt: string
  }
  contrat: {
    id: string
    idUser: string
    poste: string
    typeContrat: string
    dateDebut: string
    dateFin: string
    etablissementDeSante: string
    serviceDeSante: string
    matricule: string
    salaire: string
    fichierContratNonSignerPdf: string
    fichierContratSignerPdf: string
    createdAt: string
    updatedAt: string
  }
}

export default function InfoPerso() {
  const [isLoading, setIsLoading] = useState(false)
  const [userDetails, setUserDetails] = useState<UserData>()

  const fetchAbsenceDetails = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/cmd4a8b5q0000gp9gkgmv3kvp`
      )
      setUserDetails(response.data.data)
    } catch (error) {
      console.error('Failed to fetch user details:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAbsenceDetails()
  }, [fetchAbsenceDetails])

  return (
    <>
      <ProfileBanner />

      {isLoading ? (
        <>Loading...</>
      ) : (
        <section className="w-11/12 max-w-[1200px] pb-28 mx-auto gap-10 flex flex-col ">
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
              label="Nom de naissance"
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
              value={userDetails?.naissance.paysDeNationalite ?? '-'}
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
              value={userDetails?.adresse.pays ?? '-'}
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
