import ToastNotification, { notify } from '@/lib/ToastNotification'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TrashIcon } from '@heroicons/react/24/outline'

interface PropsType {
  setOpenDeleteModal: (active: boolean) => void
  userId: string | undefined
}

export default function ApprouverAbsenceModal({
  setOpenDeleteModal,
  userId,
}: PropsType) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  const { mutate: approveAbsence, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return response.data
    },
    onSuccess: () => {
      notify({
        message: 'Demande approuvée avec succès',
        type: 'success',
      })

      // ✅ Invalidate cached absence data to reflect change
      queryClient.invalidateQueries({
        queryKey: ['user-details', userId],
      })

      setTimeout(() => {
        navigate('/accueil/absences')
      }, 200)
    },
    onError: (error) => {
      console.error(error)
      notify({
        message: "Échec de l'approbation",
        type: 'error',
      })
    },
  })

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full section-email">
      {/* Icon */}
      <TrashIcon className="w-1/3 md:w-1/4 lg:w-1/5 text-red-500" />

      {/* Content */}
      <div className="w-full h-full section-title ">
        <h2 className="my-4 text-xl text-center font-semibold sm:text-2xl lg:text-4xl text-primaryblack">
          Supprimer le salarié
        </h2>
        <p className="w-full md:w-3/4 text-gray-400 lg:w-4/5 mx-auto font-normal text-sm leading-[1.3rem] sm:text-base lg:text-lg text-subColor text-center">
          Vous êtes sur le point de supprimer ce salarié. Cette opération est
          définitive et toutes les données associées seront perdues.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center justify-around w-full gap-4 mt-10 mb-6 md:flex-row md:justify-center md:gap-10">
        <button
          type="button"
          disabled={isPending}
          onClick={() => setOpenDeleteModal(false)}
          className="w-2/3 py-2 text-sm border rounded md:w-1/3 lg:w-48 md:text-base text-primarygray border-primarygray">
          Annuler
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={() => approveAbsence()}
          className="w-2/3 disabled:cursor-not-allowed py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-red-500 bg-red-500">
          {isPending ? 'Chargement...' : 'Supprimer'}
        </button>
      </div>

      <ToastNotification />
    </div>
  )
}
