import { CheckCircleIcon } from '@heroicons/react/16/solid'
import type { IContractInfo } from '../../../UploadContract/Contrat/Contrat'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { notify } from '@/lib/ToastNotification'
import axios from 'axios'

interface PropsType {
  setActiveValidateIntegrationModal: (
    activeValidateIntegrationModal: boolean
  ) => void
  data: IContractInfo | undefined
}

export default function ValidateIntegrationModal({
  setActiveValidateIntegrationModal,
  data,
}: PropsType) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { idSalarie } = useParams()

  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  const SendContract = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      if (data) {
        formData.append('idUser', idSalarie ? idSalarie : '')
        formData.append('poste', data.poste)
        formData.append('typeContrat', data.type_de_contrat)
        formData.append('dateDebut', data.date_de_début.toString())
        formData.append('dateFin', data.date_de_fin.toString())
        formData.append('etablissementDeSante', data.etablisment_de_sante)
        formData.append('serviceDeSante', data.service_de_sante)
        formData.append('salaire', data.salaire.toString())
        formData.append('matricule', data.matricule)
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/contrats-commercial`,
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
        message: 'Contrat envoyer avec success',
        type: 'success',
      })

      setTimeout(() => {
        setActiveValidateIntegrationModal(false)
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
          Approuver formulaire d'intégration ajouter et contrat
        </h2>
        <p className="w-full md:w-3/4 text-gray-400 lg:w-4/5 mx-auto font-normal text-sm leading-[1.3rem] sm:text-base lg:text-lg text-subColor text-center">
          Vous êtes sur le point de valider les informations du salarié.Une fois
          confirmé, vous pourrez ajouter et envoyer le contrat de travail.
          Veillez à ce que toutes les données soient exactes avant de
          poursuivre.
        </p>
      </div>
      {/* buttons */}
      <div className="flex flex-col items-center justify-around w-full gap-4 mt-10 mb-6 md:flex-row md:justify-center md:gap-10">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => setActiveValidateIntegrationModal(false)}
          className="w-2/3 py-2 text-sm border rounded md:w-1/3 lg:w-48 md:text-base text-primarygray border-primarygray">
          Annuler
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={SendContract}
          className="w-2/3 py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-green-500 bg-green-500">
          {isLoading ? 'Loading...' : 'Valider'}
        </button>
      </div>
    </div>
  )
}
