import { useIntegrationFormDataContext } from '@/contexts/CompleteProfile/IntegrationForm/useIntegrationFormDataContext'
import ToastNotification, { notify } from '@/lib/ToastNotification'
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
    justificatifDomicile,
    carteVitale,
    pieceIdentite,
    pieceIdentiteVerso,
    rib,
    ameli,
    autreFichier,
    contractInfo,
    contrat,
  } = useIntegrationFormDataContext()

  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const sendIntegrationForm = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      // Add basic user fields
      formData.append('id', employeePersonalInfo.id)
      formData.append('role', 'employee')
      formData.append('statut', 'user-approuved')
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
        formData.append('naissance[idUser]', employeePersonalInfo.id)
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
        formData.append('adresse[idUser]', employeePersonalInfo.id)
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
        formData.append('paiement[idUser]', employeePersonalInfo.id)
        formData.append('paiement[iban]', employeeProfesionalInfo.iban)
        formData.append('paiement[bic]', employeeProfesionalInfo.bic)
      }
      // urgence
      if (employeeProfesionalInfo) {
        formData.append('urgence[idUser]', employeePersonalInfo.id)
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
        // pièce identité recto
        if (pieceIdentite && pieceIdentite instanceof File) {
          formData.append(
            'justificatif[fichierPieceIdentitePdf]',
            pieceIdentite
          )
        }
        // pièce identité verso
        if (pieceIdentiteVerso && pieceIdentiteVerso instanceof File) {
          formData.append(
            'justificatif[fichierPieceIdentitePdfVerso]',
            pieceIdentiteVerso
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
        // autreFichier
        if (autreFichier && autreFichier instanceof File) {
          formData.append('justificatif[autreFichier]', autreFichier)
        }

        // contrat
        if (contractInfo) {
          formData.append('contrat[idUser]', employeePersonalInfo.id)
          formData.append('contrat[poste]', contractInfo.poste)
          formData.append('contrat[typeContrat]', contractInfo.type_de_contrat)
          formData.append(
            'contrat[dateDebut]',
            contractInfo.date_de_début.toString()
          )
          formData.append(
            'contrat[dateFin]',
            contractInfo.date_de_fin.toString()
          )
          formData.append(
            'contrat[etablissementDeSante]',
            contractInfo.etablisment_de_sante
          )
          formData.append(
            'contrat[serviceDeSante]',
            contractInfo.service_de_sante
          )
          formData.append('contrat[salaire]', contractInfo.salaire.toString())
          formData.append('contrat[matricule]', contractInfo.matricule)
        }

        // contract file pdf
        if (contrat && contrat instanceof File) {
          formData.append('contrat[fichierContratSignerPdf]', contrat)
        }

        // Only add justificatif section if at least one file exists
        const hasAnyFile = [
          carteVitale,
          rib,
          pieceIdentite,
          pieceIdentiteVerso,
          justificatifDomicile,
          ameli,
          autreFichier,
          contrat,
        ].some((file) => file instanceof File)

        if (hasAnyFile) {
          // Add idUser for justificatif
        }
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/signup`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response)

      notify({
        message: `Salarié ajouter avec success`,
        type: 'success',
      })

      setTimeout(() => {
        navigate(0)
        setIsLoading(false)
      }, 200)
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
          disabled={isLoading}
          onClick={() => setActiveValidateIntegrationModal(false)}
          className="w-2/3 disabled:cursor-not-allowed disabled:opacity-30 py-2 text-sm border rounded md:w-1/3 lg:w-48 md:text-base text-primarygray border-primarygray">
          Annuler
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={sendIntegrationForm}
          className="w-2/3 disabled:cursor-not-allowed disabled:opacity-30 py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-green-500 bg-green-500">
          {isLoading ? 'Chargement...' : 'Valider'}
        </button>
      </div>
      <ToastNotification />
    </div>
  )
}
