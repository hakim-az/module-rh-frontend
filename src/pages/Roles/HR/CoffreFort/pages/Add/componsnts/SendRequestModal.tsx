import { CheckCircleIcon } from '@heroicons/react/16/solid'
import { useNavigate } from 'react-router-dom'
import type { ICoffre } from '../Add'
import { useState } from 'react'
import axios from 'axios'
import ToastNotification, { notify } from '@/lib/ToastNotification'

interface PropsType {
  setActiveSendRequestModal: (activeSendRequestModal: boolean) => void
  data: ICoffre | undefined
}

export default function SendRequestModal({
  setActiveSendRequestModal,
  data,
}: PropsType) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const AddCoffre = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      if (data) {
        formData.append('idUser', 'cmd4a8b5q0000gp9gkgmv3kvp')
        formData.append('typeBulletin', data.type)
        formData.append('mois', data.mois)
        formData.append('annee', data.annee.toString())
        formData.append('note', data.note)
        formData.append('fichierJustificatifPdf', data.justificatif)
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/coffres`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      console.log(response)

      notify({
        message: 'Coffre ajouter avec success',
        type: 'success',
      })

      setTimeout(() => {
        navigate('/accueil/coffre-fort')
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
          Ajouter un document salarié
        </h2>
        <p className="w-full md:w-3/4 text-gray-400 lg:w-4/5 mx-auto font-normal text-sm leading-[1.3rem] sm:text-base lg:text-lg text-subColor text-center">
          Vous êtes sur le point dajouter un document au coffre-fort numérique
          du salarié sélectionné. Vérifiez que le type de document, la période
          et le fichier joint sont corrects. Une fois validé, le salarié sera
          notifié et pourra le consulter depuis son espace personnel.
        </p>
      </div>
      {/* buttons */}
      <div className="flex flex-col items-center justify-around w-full gap-4 mt-10 mb-6 md:flex-row md:justify-center md:gap-10">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => setActiveSendRequestModal(false)}
          className="w-2/3 py-2 text-sm border rounded md:w-1/3 lg:w-48 md:text-base text-primarygray border-primarygray">
          Annuler
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            AddCoffre()
          }}
          className="w-2/3 disabled:cursor-not-allowed py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-green-500 bg-green-500">
          {isLoading ? 'Loading...' : 'Valider'}
        </button>
      </div>
      <ToastNotification />
    </div>
  )
}
