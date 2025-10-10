import { CheckCircleIcon } from '@heroicons/react/16/solid'
import { useNavigate, useParams } from 'react-router-dom'
import type { ICoffre } from '../Update'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import ToastNotification, { notify } from '@/lib/ToastNotification'

interface PropsType {
  setActiveUpdateCoffreModal: (activeUpdateCoffreModal: boolean) => void
  data: ICoffre | undefined
}

export default function UpdateCoffreModal({
  setActiveUpdateCoffreModal,
  data,
}: PropsType) {
  const navigate = useNavigate()
  const { idCoffre } = useParams()

  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  // Mutation function to update the coffre
  const updateCoffre = async (data: ICoffre) => {
    const formData = new FormData()
    formData.append('typeBulletin', data.type)
    formData.append('mois', data.mois)
    formData.append('annee', data.annee.toString())
    formData.append('note', data.note)
    if (data.justificatif !== undefined) {
      formData.append('fichierJustificatifPdf', data.justificatif)
    }

    const response = await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/coffres/${idCoffre}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  }

  const mutation = useMutation({
    mutationFn: updateCoffre,
    onSuccess: () => {
      notify({
        message: 'Coffre modifié avec succès',
        type: 'success',
      })
      setTimeout(() => {
        navigate('/accueil/coffre-fort')
        setActiveUpdateCoffreModal(false)
      }, 200)
    },
    onError: () => {
      notify({
        message: 'Échec de la modification',
        type: 'error',
      })
    },
  })

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full section-email">
      {/* Hero icon */}
      <CheckCircleIcon className="w-1/3 md:w-1/4 lg:w-1/5 fill-green-500" />
      {/* content */}
      <div className="w-full h-full section-title ">
        <h2 className="my-4 text-xl text-center font-semibold sm:text-2xl lg:text-4xl text-primaryblack">
          Modifier coffre fort
        </h2>
        <p className="w-full md:w-3/4 text-gray-400 lg:w-4/5 mx-auto font-normal text-sm leading-[1.3rem] sm:text-base lg:text-lg text-subColor text-center">
          Ici, vous pouvez mettre à jour les informations ou paramètres de votre
          coffre-fort afin de garantir la sécurité et l'accessibilité de vos
          documents importants.
        </p>
      </div>
      {/* buttons */}
      <div className="flex flex-col items-center justify-around w-full gap-4 mt-10 mb-6 md:flex-row md:justify-center md:gap-10">
        <button
          type="button"
          disabled={mutation.isPending}
          onClick={() => setActiveUpdateCoffreModal(false)}
          className="w-2/3 disabled:cursor-not-allowed disabled:opacity-30 py-2 text-sm border rounded md:w-1/3 lg:w-48 md:text-base text-primarygray border-primarygray">
          Annuler
        </button>
        <button
          type="button"
          disabled={mutation.isPending}
          onClick={() => {
            if (data) mutation.mutate(data)
          }}
          className="w-2/3 disabled:cursor-not-allowed disabled:opacity-30 py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-green-500 bg-green-500">
          {mutation.isPending ? 'Chargement...' : 'Valider'}
        </button>
      </div>
      <ToastNotification />
    </div>
  )
}
