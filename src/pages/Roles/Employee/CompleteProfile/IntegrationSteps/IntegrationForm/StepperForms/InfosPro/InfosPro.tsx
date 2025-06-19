import { ControlledInput } from '@/components/FormFeilds/ControlledInput/ControlledInput'
import { ControlledSelect } from '@/components/FormFeilds/ControlledSelect/ControlledSelect'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface PropsType {
  currentStepIndex: number
  setActiveValidateIntegrationModal: (
    activeValidateIntegrationModal: boolean
  ) => void
  setCurrentStepIndex: (setCurrentStepIndex: number) => void
  labels: string[]
}

type FormValues = {
  iban: string
  bic: string
  nom_complet: string
  lien_avec_salarie: string
  tel: string
}

export default function InfosPro({
  currentStepIndex,
  setActiveValidateIntegrationModal,
  setCurrentStepIndex,
  labels,
}: PropsType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({ mode: 'onBlur' })

  const onSubmit = (data: FormValues) => {
    console.log(data)
    if (currentStepIndex === labels.length - 1) {
      setActiveValidateIntegrationModal(true)
    } else {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }
  return (
    <form
      className="w-full mx-auto gap-10 flex flex-col "
      onSubmit={handleSubmit(onSubmit)}>
      {/* Paiement */}
      <div className="grid grid-cols-1 items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Paiement :
        </span>
        {/* IBAN */}
        <ControlledInput
          name="iban"
          label="IBAN"
          placeholder="IBAN"
          register={register}
          rules={{ required: true }}
          error={errors.iban}
          inputType="text"
        />
        {/* BIC */}
        <ControlledInput
          name="bic"
          label="BIC"
          placeholder="BIC"
          register={register}
          rules={{ required: true }}
          error={errors.bic}
          inputType="text"
        />
      </div>
      {/* Contact d'urgence */}
      <div className="grid grid-cols-1 items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Contact d'urgence :
        </span>
        {/* Nom complet */}
        <ControlledInput
          name="nom_complet"
          label="Nom complet"
          placeholder="Nom complet"
          register={register}
          rules={{ required: true }}
          error={errors.nom_complet}
          inputType="text"
        />
        {/* Lien avec le salarié */}
        <ControlledSelect
          name="lien_avec_salarie"
          label="Lien avec le salarié "
          placeholder="Lien avec le salarié "
          control={control}
          rules={{ required: true }}
          items={[{ label: 'Frère', value: 'frere' }]}
          error={errors.lien_avec_salarie}
        />
        {/* Téléphone */}
        <ControlledInput
          name="tel"
          label="Téléphone"
          placeholder="+33 7 77 77 77 77"
          register={register}
          rules={{ required: true }}
          error={errors.tel}
          inputType="number"
        />
      </div>
      <div className="w-full flex gap-16 justify-center">
        {/* revenir */}
        <Button
          onClick={goBack}
          disabled={currentStepIndex === 0}
          variant="outline"
          size={'lg'}>
          <ChevronLeft /> Revenir
        </Button>
        {/* continuer */}
        <Button
          type="submit"
          disabled={currentStepIndex === labels.length}
          variant="default"
          size={'lg'}>
          {currentStepIndex === labels.length - 1 ? 'Valider' : 'Continuer'}
          <ChevronRight />
        </Button>
      </div>
    </form>
  )
}
