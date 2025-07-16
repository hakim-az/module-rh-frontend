import { CheckCircleIcon } from '@heroicons/react/16/solid'
import { useNavigate, useParams } from 'react-router-dom'
import type { IRestauForm } from '../Update'
import { useState } from 'react'
import axios from 'axios'
import ToastNotification, { notify } from '@/lib/ToastNotification'

interface PropsType {
  setActiveUpdateTitreRestau: (activeUpdateTitreRestau: boolean) => void
  data: IRestauForm | undefined
}

export default function UpdateTitreRestau({
  setActiveUpdateTitreRestau,
  data,
}: PropsType) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { idTitre } = useParams()

  const AddCoffre = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      if (data) {
        formData.append('nbrJours', data.nbr_jr)
        formData.append('mois', data.mois)
        formData.append('annee', data.annee.toString())
        formData.append('note', data.note)
        if (data.justificatif !== undefined) {
          formData.append('fichierJustificatifPdf', data.justificatif)
        }
      }
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/restaux/${idTitre}`,
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
          Modifier Titre Restaurant
        </h2>
        <p className="w-full md:w-3/4 text-gray-400 lg:w-4/5 mx-auto font-normal text-sm leading-[1.3rem] sm:text-base lg:text-lg text-subColor text-center">
          Vous êtes sur le point de modifier un enregistrement de
          titres-restaurant pour le salarié sélectionné. Vérifiez que le mois,
          l'année, le nombre de jours ouvrés et les justificatifs sont corrects.
          Une fois confirmé, le salarié pourra consulter cette information dans
          son historique.
        </p>
      </div>
      {/* buttons */}
      <div className="flex flex-col items-center justify-around w-full gap-4 mt-10 mb-6 md:flex-row md:justify-center md:gap-10">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => setActiveUpdateTitreRestau(false)}
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
