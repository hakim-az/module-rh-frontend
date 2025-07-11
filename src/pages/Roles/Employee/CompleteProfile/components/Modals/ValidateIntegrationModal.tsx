import { useIntegrationFormDataContext } from '@/contexts/CompleteProfile/IntegrationForm/useIntegrationFormDataContext'
import { CheckCircleIcon } from '@heroicons/react/16/solid'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface PropsType {
  setActiveValidateIntegrationModal: (
    activeValidateIntegrationModal: boolean
  ) => void
}

export default function ValidateIntegrationModal({
  setActiveValidateIntegrationModal,
}: PropsType) {
  // integration form context
  const {
    employeePersonalInfo,
    // employeeProfesionalInfo,
    justificatifDomicile,
    // carteVitale,
    // pieceIdentite,
    // rib,
  } = useIntegrationFormDataContext()

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const submitConfirmation = async () => {
    setIsLoading(true)
    try {
      const payload = {
        // user
        role: 'employee',
        statut: 'profile-completed',
        civilite: employeePersonalInfo.civilite,
        prenom: employeePersonalInfo.prenom,
        nomDeNaissance: employeePersonalInfo.nom_de_naissance,
        nomUsuel: employeePersonalInfo.nom_usuel,
        situationFamiliale: employeePersonalInfo.situation_familiale,
        numeroSecuriteSociale: employeePersonalInfo.numero_ssr,
        emailPersonnel: employeePersonalInfo.email_perso,
        emailProfessionnel: employeePersonalInfo.email_pro,
        telephonePersonnel: employeePersonalInfo.tel_perso.toString(),
        telephoneProfessionnel: employeePersonalInfo.tel_pro.toString(),
        avatar: '',
        // naissance
        naissance: {
          idUser: '123456',
          dateDeNaissance: employeePersonalInfo.date_de_naissance,
          paysDeNaissance: employeePersonalInfo.pays_de_naissance,
          departementDeNaissance: employeePersonalInfo.departement_de_naissance,
          communeDeNaissance: employeePersonalInfo.commune_de_naissance,
          paysDeNationalite: employeePersonalInfo.commune_de_naissance,
        },
        //adresse
        adresse: {
          idUser: '123456',
          pays: employeePersonalInfo.pays,
          codePostal: employeePersonalInfo.code_postal,
          ville: employeePersonalInfo.ville,
          adresse: employeePersonalInfo.adresse,
          complementAdresse: employeePersonalInfo.complement_adresse,
          domiciliteHorsLaFrance: false,
        },
        // paiement

        // justificatif
        justificatif: {
          idUser: '123456',
          fichierCarteVitalePdf: 'carte-vitale',
          fichierRibPdf: 'rib.pdf',
          fichierPieceIdentitePdf: 'pieceIdentite.pdf',
          fichierJustificatifDomicilePdf: justificatifDomicile,
        },
      }

      const response = await axios.post(
        'http://localhost:3000/users',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      console.log(response.data)

      setTimeout(() => {
        navigate(0)
        setIsLoading(false)
      }, 5000)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full section-email">
      {/* Hero icon */}
      <CheckCircleIcon className="w-1/3 md:w-1/4 lg:w-1/5 fill-green-500" />
      {/* content */}
      <div className="w-full h-full section-title ">
        <h2 className="my-4 text-xl text-center font-semibold sm:text-2xl lg:text-4xl text-primaryblack">
          Valider le formulaire d'intégration
        </h2>
        <p className="w-full md:w-3/4 text-gray-400 lg:w-4/5 mx-auto font-normal text-sm leading-[1.3rem] sm:text-base lg:text-lg text-subColor text-center">
          En validant ce formulaire, vos informations personnelles,
          professionnelles et les documents justificatifs seront envoyés au
          service RH.Veuillez vous assurer que toutes les données sont
          correctes. Aucune modification ne sera possible après l'envoi.
        </p>
      </div>
      {/* buttons */}
      <div className="flex flex-col items-center justify-around w-full gap-4 mt-10 mb-6 md:flex-row md:justify-center md:gap-10">
        <button
          type="button"
          onClick={() => setActiveValidateIntegrationModal(false)}
          className="w-2/3 py-2 text-sm border rounded md:w-1/3 lg:w-48 md:text-base text-primarygray border-primarygray">
          Annuler
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            // localStorage.setItem('userStatus', 'step-2')
            // setActiveValidateIntegrationModal(false)
            submitConfirmation()
            // window.location.reload()
          }}
          className="w-2/3 disabled:cursor-not-allowed py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-green-500 bg-green-500">
          {isLoading ? 'Loading...' : 'Valider'}
        </button>
      </div>
    </div>
  )
}
