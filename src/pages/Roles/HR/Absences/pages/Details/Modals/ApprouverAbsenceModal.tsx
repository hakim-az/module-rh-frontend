import ToastNotification, { notify } from '@/lib/ToastNotification'
import { CheckCircleIcon } from '@heroicons/react/16/solid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface PropsType {
  setActiveApprouverAbsenceModal: (active: boolean) => void
  absenceId: string | undefined
}

export default function ApprouverAbsenceModal({
  setActiveApprouverAbsenceModal,
  absenceId,
}: PropsType) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: approveAbsence, isPending } = useMutation({
    mutationFn: async () => {
      const formData = new FormData()
      formData.append('statut', 'approuver')

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/absences/${absenceId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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
        queryKey: ['absence-details', absenceId],
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
      <CheckCircleIcon className="w-1/3 md:w-1/4 lg:w-1/5 fill-green-500" />

      {/* Content */}
      <div className="w-full h-full section-title ">
        <h2 className="my-4 text-xl text-center font-semibold sm:text-2xl lg:text-4xl text-primaryblack">
          Approuver l'absence
        </h2>
        <p className="w-full md:w-3/4 text-gray-400 lg:w-4/5 mx-auto font-normal text-sm leading-[1.3rem] sm:text-base lg:text-lg text-subColor text-center">
          Vous êtes sur le point d'approuver cette absence. Cette opération est
          définitive et ne pourra pas être modifiée par la suite.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center justify-around w-full gap-4 mt-10 mb-6 md:flex-row md:justify-center md:gap-10">
        <button
          type="button"
          disabled={isPending}
          onClick={() => setActiveApprouverAbsenceModal(false)}
          className="w-2/3 py-2 text-sm border rounded md:w-1/3 lg:w-48 md:text-base text-primarygray border-primarygray">
          Annuler
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={() => approveAbsence()}
          className="w-2/3 disabled:cursor-not-allowed py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-green-500 bg-green-500">
          {isPending ? 'Chargement...' : 'Valider'}
        </button>
      </div>

      <ToastNotification />
    </div>
  )
}
