import { ControlledTextarea } from '@/components/FormFeilds/ControlledTextarea/ControlledTextarea '
import { XCircleIcon } from '@heroicons/react/16/solid'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface PropsType {
  setActiveRefuserAbsenceModal: (activeRefuserAbsenceModal: boolean) => void
}

interface IForm {
  note: string
}

export default function RefuserAbsenceModal({
  setActiveRefuserAbsenceModal,
}: PropsType) {
  const navigate = useNavigate()
  // react hook form
  const methods = useForm<IForm>({
    mode: 'onBlur',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = (data: IForm) => {
    console.log(data)

    navigate('/accueil/absences')
  }
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col items-center justify-center w-full h-full section-email">
        {/* Hero icon */}
        <XCircleIcon className="w-1/3 md:w-1/4 lg:w-1/5 fill-red-500" />
        {/* content */}
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
            onClick={() => setActiveRefuserAbsenceModal(false)}
            className="w-2/3 py-2 text-sm border rounded md:w-1/3 lg:w-48 md:text-base text-primarygray border-primarygray">
            Annuler
          </button>
          <button
            type="submit"
            className="w-2/3 disabled:cursor-not-allowed py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-red-500 bg-red-500">
            Valider
          </button>
        </div>
      </form>
    </FormProvider>
  )
}
