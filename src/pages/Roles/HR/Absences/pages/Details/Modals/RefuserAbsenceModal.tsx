import { ControlledTextarea } from '@/components/FormFeilds/ControlledTextarea/ControlledTextarea '
import ToastNotification, { notify } from '@/lib/ToastNotification'
import { XCircleIcon } from '@heroicons/react/16/solid'
import axios from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface PropsType {
  setActiveRefuserAbsenceModal: (active: boolean) => void
  absenceId: string | undefined
}

interface IForm {
  note: string
}

export default function RefuserAbsenceModal({
  setActiveRefuserAbsenceModal,
  absenceId,
}: PropsType) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const methods = useForm<IForm>({
    mode: 'onBlur',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const { mutate: refuseAbsence, isPending } = useMutation({
    mutationFn: async (data: IForm) => {
      const formData = new FormData()
      formData.append('statut', 'refuser')
      formData.append('motifDeRefus', data.note)

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
        message: 'Demande refusée avec succès',
        type: 'success',
      })

      queryClient.invalidateQueries({
        queryKey: ['absence-details', absenceId],
      })

      setTimeout(() => {
        navigate('/accueil/absences')
      }, 200)
    },
    onError: () => {
      notify({
        message: 'Échec du refus',
        type: 'error',
      })
    },
  })

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data) => refuseAbsence(data))}
        className="relative flex flex-col items-center justify-center w-full h-full section-email">
        <XCircleIcon className="w-1/3 md:w-1/4 lg:w-1/5 fill-red-500" />
        <div className="w-full h-full section-title ">
          <h2 className="my-4 text-xl text-center font-semibold sm:text-2xl lg:text-4xl text-primaryblack">
            Refuser l'absence
          </h2>
          <ControlledTextarea
            name="note"
            label="Note"
            placeholder="Entrez votre note ici"
            register={register}
            rules={{ required: 'La note est obligatoire.' }}
            error={errors.note}
          />
        </div>

        {/* buttons */}
        <div className="flex flex-col items-center justify-around w-full gap-4 mt-10 mb-6 md:flex-row md:justify-center md:gap-10">
          <button
            type="button"
            disabled={isPending}
            onClick={() => setActiveRefuserAbsenceModal(false)}
            className="w-2/3 py-2 text-sm border rounded md:w-1/3 lg:w-48 md:text-base text-primarygray border-primarygray">
            Annuler
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="w-2/3 disabled:cursor-not-allowed py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-red-500 bg-red-500">
            {isPending ? 'Chargement...' : 'Valider'}
          </button>
        </div>
      </form>
      <ToastNotification />
    </FormProvider>
  )
}
