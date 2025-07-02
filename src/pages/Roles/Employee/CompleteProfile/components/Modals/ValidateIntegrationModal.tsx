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
    employeeProfesionalInfo,
    // justificatifDomicile,
    // carteVitale,
    // pieceIdentite,
    // rib,
  } = useIntegrationFormDataContext()

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const submiConfirmation = async () => {
    setIsLoading(true)
    try {
      const payload = {
        prenom: employeePersonalInfo.prenom,
        nomDeNaissance: employeePersonalInfo.nom_de_naissance,
        nomUsuel: employeePersonalInfo.nom_usuel,
        status: 'step-2',
        situationFamiliale: employeePersonalInfo.situation_familiale,
        emailPerso: employeePersonalInfo.email_perso,
        emailPro: employeePersonalInfo.email_pro,
        telPerso: Number(employeePersonalInfo.tel_perso),
        telPro: Number(employeePersonalInfo.tel_pro),
        dateDeNaissance: employeePersonalInfo.date_de_naissance,
        paysDeNaissance: employeePersonalInfo.pays_de_naissance,
        departmentDeNaissance: employeePersonalInfo.departement_de_naissance,
        communeDeNaissance: employeePersonalInfo.commune_de_naissance,
        paysDeNationalite: employeePersonalInfo.pays_de_nationalite,
        pays: employeePersonalInfo.pays,
        codePostal: Number(employeePersonalInfo.code_postal),
        ville: employeePersonalInfo.ville,
        adresse: employeePersonalInfo.adresse,
        complementAdresse: employeePersonalInfo.complement_adresse,
        iban: employeeProfesionalInfo.iban,
        bic: employeeProfesionalInfo.bic,
        tel: Number(employeeProfesionalInfo.tel),
        nomComplet: employeeProfesionalInfo.nom_complet,
        lienAvecSalarie: employeeProfesionalInfo.lien_avec_salarie,
        carteVitale: 'carte-vitale.pdf',
        rib: 'rib.pdf',
        pieceIdentite: 'pieceIdentite.pdf',
        justificatifDeDomicile: 'justificatifDeDomicile.pdf',
      }

      const response = await axios.post(
        'http://localhost:3000/salaries',
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
            submiConfirmation()
            // window.location.reload()
          }}
          className="w-2/3 disabled:cursor-not-allowed py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-green-500 bg-green-500">
          {isLoading ? 'Loading...' : 'Valider'}
        </button>
      </div>
    </div>
  )
}
