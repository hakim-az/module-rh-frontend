import { useIntegrationFormDataContext } from '@/contexts/CompleteProfile/IntegrationForm/useIntegrationFormDataContext'
import ToastNotification, { notify } from '@/lib/ToastNotification'
import type { User } from '@/types/user.types'
import { CheckCircleIcon } from '@heroicons/react/16/solid'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface PropsType {
  setActiveValidateIntegrationModal: (
    activeValidateIntegrationModal: boolean
  ) => void
  onSuccess: (user: User) => void
}

export default function ValidateIntegrationModal({
  setActiveValidateIntegrationModal,
}: PropsType) {
  // integration form context
  const {
    employeePersonalInfo,
    employeeProfesionalInfo,
    justificatifDomicile,
    carteVitale,
    pieceIdentite,
    rib,
    ameli,
  } = useIntegrationFormDataContext()

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const sendIntegrationForm = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      // Add basic user fields
      formData.append('role', 'employee')
      formData.append('statut', 'profile-completed')
      formData.append('civilite', employeePersonalInfo.civilite)
      formData.append('prenom', employeePersonalInfo.prenom)
      formData.append('nomDeNaissance', employeePersonalInfo.nom_de_naissance)
      formData.append('nomUsuel', employeePersonalInfo.nom_usuel)
      formData.append(
        'situationFamiliale',
        employeePersonalInfo.situation_familiale
      )
      formData.append('numeroSecuriteSociale', employeePersonalInfo.numero_ssr)
      formData.append('emailPersonnel', employeePersonalInfo.email_perso)
      formData.append('emailProfessionnel', employeePersonalInfo.email_pro)
      formData.append('telephonePersonnel', employeePersonalInfo.tel_perso)
      formData.append('telephoneProfessionnel', employeePersonalInfo.tel_pro)
      formData.append('avatar', '')

      // Add nested objects as JSON strings
      if (employeePersonalInfo) {
        formData.append('naissance[idUser]', 'test1234')
        formData.append(
          'naissance[dateDeNaissance]',
          employeePersonalInfo.date_de_naissance
        )
        formData.append(
          'naissance[paysDeNaissance]',
          employeePersonalInfo.pays_de_naissance
        )
        formData.append(
          'naissance[departementDeNaissance]',
          employeePersonalInfo.departement_de_naissance
        )
        formData.append(
          'naissance[communeDeNaissance]',
          employeePersonalInfo.commune_de_naissance
        )
        formData.append(
          'naissance[paysDeNationalite]',
          employeePersonalInfo.pays_de_nationalite
        )
      }
      // adresse
      if (employeePersonalInfo) {
        formData.append('adresse[idUser]', 'test1234')
        formData.append('adresse[pays]', employeePersonalInfo.pays)
        formData.append('adresse[codePostal]', employeePersonalInfo.code_postal)
        formData.append('adresse[ville]', employeePersonalInfo.ville)
        formData.append('adresse[adresse]', employeePersonalInfo.adresse)
        formData.append(
          'adresse[complementAdresse]',
          employeePersonalInfo.complement_adresse
        )

        formData.append('adresse[domiciliteHorsLaFrance]', 'false')
      }
      // paiment
      if (employeeProfesionalInfo) {
        formData.append('paiement[idUser]', 'test1234')
        formData.append('paiement[iban]', employeeProfesionalInfo.iban)
        formData.append('paiement[bic]', employeeProfesionalInfo.bic)
      }
      // urgence
      if (employeeProfesionalInfo) {
        formData.append('urgence[idUser]', 'test1234')
        formData.append(
          'urgence[nomComplet]',
          employeeProfesionalInfo.nom_complet
        )
        formData.append(
          'urgence[lienAvecLeSalarie]',
          employeeProfesionalInfo.lien_avec_salarie
        )
        formData.append('urgence[telephone]', employeeProfesionalInfo.tel)
      }

      // justificatifs
      if (justificatifDomicile) {
        // carte vitale
        if (carteVitale && carteVitale instanceof File) {
          formData.append('justificatif[fichierCarteVitalePdf]', carteVitale)
        }
        // rib
        if (rib && rib instanceof File) {
          formData.append('justificatif[fichierRibPdf]', rib)
        }
        // pièce identité
        if (pieceIdentite && pieceIdentite instanceof File) {
          formData.append(
            'justificatif[fichierPieceIdentitePdf]',
            pieceIdentite
          )
        }
        // justificatif de domicile
        if (justificatifDomicile && justificatifDomicile instanceof File) {
          formData.append(
            'justificatif[fichierJustificatifDomicilePdf]',
            justificatifDomicile
          )
        }
        // ameli
        if (ameli && ameli instanceof File) {
          formData.append('justificatif[fichierAmeli]', ameli)
        }

        // Only add justificatif section if at least one file exists
        const hasAnyFile = [
          carteVitale,
          rib,
          pieceIdentite,
          justificatifDomicile,
          ameli,
        ].some((file) => file instanceof File)

        if (hasAnyFile) {
          // Add idUser for justificatif
          formData.append('justificatif[idUser]', 'test1234')
        }
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      console.log(response)

      notify({
        message: `Formulair d'integration envoyer avec success`,
        type: 'success',
      })

      // Assuming response.data contains the created user object with an `id` field
      const userId = response.data.data.id
      if (userId) {
        localStorage.setItem('userId', userId)
      }

      setTimeout(() => {
        navigate('/accueil/absences')
        setIsLoading(false)
      }, 2000)
    } catch (error) {
      console.error(error)

      notify({
        message: 'Echec',
        type: 'error',
      })

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
          onClick={sendIntegrationForm}
          className="w-2/3 disabled:cursor-not-allowed py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-green-500 bg-green-500">
          {isLoading ? 'Loading...' : 'Valider'}
        </button>
      </div>
      <ToastNotification />
    </div>
  )
}
