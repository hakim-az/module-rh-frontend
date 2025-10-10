import { CheckCircleIcon } from '@heroicons/react/16/solid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import type { IFormData } from '../Update'
import { useState } from 'react'
import ToastNotification, { notify } from '@/lib/ToastNotification'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'

interface PropsType {
  setActiveSendRequestModal: (activeSendRequestModal: boolean) => void
  data: IFormData | undefined
}

export default function UpdateInfosProModal({
  setActiveSendRequestModal,
  data,
}: PropsType) {
  const { userDetails } = useDashboardContext()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  const UpdateAbsence = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      if (data) {
        //paiement
        formData.append('paiement[iban]', data.iban)
        formData.append('paiement[bic]', data.bic)
        // urgence
        formData.append('urgence[nomComplet]', data.nom_complet)
        formData.append('urgence[lienAvecLeSalarie]', data.lien_avec_salarie)
        formData.append('urgence[telephone]', data.tel)
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/users/${userDetails?.id}`,
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
        message: 'Informations professionnelles modifier avec success',
        type: 'success',
      })

      setTimeout(() => {
        navigate('/accueil/informations-professionnelles')
        window.location.reload()
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
          Valider la modification des infos professionnelles
        </h2>
        <p className="w-full md:w-3/4 text-gray-400 lg:w-4/5 mx-auto font-normal text-sm leading-[1.3rem] sm:text-base lg:text-lg text-subColor text-center">
          Vous êtes sur le point de modifier vos informations professionnelles.
          Veuillez confirmer pour enregistrer les changements apportés à votre
          profil.
        </p>
      </div>
      {/* buttons */}
      <div className="flex flex-col items-center justify-around w-full gap-4 mt-10 mb-6 md:flex-row md:justify-center md:gap-10">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => setActiveSendRequestModal(false)}
          className="w-2/3 disabled:cursor-not-allowed disabled:opacity-30 py-2 text-sm border rounded md:w-1/3 lg:w-48 md:text-base text-primarygray border-primarygray">
          Annuler
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            UpdateAbsence()
          }}
          className="w-2/3 disabled:cursor-not-allowed disabled:opacity-30 py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-green-500 bg-green-500">
          {isLoading ? 'Chargement...' : 'Valider'}
        </button>
      </div>
      <ToastNotification />
    </div>
  )
}
