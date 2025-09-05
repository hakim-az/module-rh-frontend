import FileUploader from '@/components/FileUploader/FileUploader'
import { ControlledInput } from '@/components/FormFeilds/ControlledInput/ControlledInput'
import { ControlledSelect } from '@/components/FormFeilds/ControlledSelect/ControlledSelect'
import { Button } from '@/components/ui/button'
import type { IContractInfo } from '@/contexts/CompleteProfile/IntegrationForm/IntegrationFormContext'
import { useIntegrationFormDataContext } from '@/contexts/CompleteProfile/IntegrationForm/useIntegrationFormDataContext'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

interface PropsType {
  currentStepIndex: number
  setActiveValidateIntegrationModal: (b: boolean) => void
  labels: string[]
  goNext: () => void
  goBack: () => void
}

export default function Justificatifs({
  currentStepIndex,
  setActiveValidateIntegrationModal,
  labels,
  goNext,
  goBack,
}: PropsType) {
  // integration form context
  const { contractInfo, setContractInfo, contrat, setContrat } =
    useIntegrationFormDataContext()

  // react hook form
  const methods = useForm<IContractInfo>({
    mode: 'onBlur',
    defaultValues: {
      poste: contractInfo?.poste,
      type_de_contrat: contractInfo?.type_de_contrat,
      date_de_début: contractInfo?.date_de_début,
      date_de_fin: contractInfo?.date_de_fin,
      matricule: contractInfo?.matricule,
      etablisment_de_sante: contractInfo?.etablisment_de_sante,
      service_de_sante: contractInfo?.service_de_sante,
      salaire: contractInfo?.salaire,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = methods

  const onSubmit = (data: IContractInfo) => {
    setContractInfo(data)
    goNext()
    if (currentStepIndex === labels.length - 1) {
      setActiveValidateIntegrationModal(true)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        className="w-full mx-auto gap-10 flex flex-col "
        onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1  bg-white lg:grid-cols-2 p-7 gap-10 rounded-md border border-gray-200 shadow-md w-full">
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            Définition du contrat :
          </span>
          {/* Poste */}
          <ControlledInput
            name="poste"
            label="Poste"
            placeholder="Entrer un poste"
            register={register}
            rules={{ required: true }}
            error={errors.poste}
            inputType="text"
            inputDefaultValue=""
          />
          {/* Type de contrat */}
          <ControlledSelect
            name="type_de_contrat"
            label="Type de contrat"
            placeholder="Type de contrat"
            control={control}
            rules={{ required: true }}
            items={[
              { label: 'Satge', value: 'stage' },
              { label: 'Alternance', value: 'alternance' },
              { label: 'CDD', value: 'cdd' },
              { label: 'CDI', value: 'cdi' },
            ]}
            error={errors.type_de_contrat}
            selectDefaultValue=""
          />
          {/* Date de début */}
          <ControlledInput
            name="date_de_début"
            label="Date de début"
            placeholder=""
            register={register}
            rules={{ required: true }}
            error={errors.date_de_début}
            inputType="date"
            inputDefaultValue=""
          />
          {/* Date de fin */}
          <ControlledInput
            name="date_de_fin"
            label="Date de fin"
            placeholder=""
            register={register}
            rules={{ required: true }}
            error={errors.date_de_début}
            inputType="date"
            inputDefaultValue=""
          />
          {/* Matricule */}
          <ControlledInput
            name="matricule"
            label="Matricule"
            placeholder="Matricule"
            register={register}
            rules={{ required: true }}
            error={errors.matricule}
            inputType="text"
            inputDefaultValue=""
          />
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            L'établissement et le service de santé :
          </span>
          {/* Etablissement */}
          <ControlledInput
            name="etablisment_de_sante"
            label="Etablissement"
            placeholder="Entrer un établissement"
            register={register}
            rules={{ required: true }}
            error={errors.etablisment_de_sante}
            inputType="text"
            inputDefaultValue=""
          />
          {/* Service de santé */}
          <ControlledInput
            name="service_de_sante"
            label="Service"
            placeholder="Entrer un service"
            register={register}
            rules={{ required: true }}
            error={errors.service_de_sante}
            inputType="text"
            inputDefaultValue=""
          />
        </div>
        <div className="grid grid-cols-1  bg-white lg:grid-cols-2 p-7 gap-10 rounded-md border border-gray-200 shadow-md w-full">
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            Rémunération :
          </span>
          {/* Mode de salaire de base */}
          <ControlledInput
            name="salaire"
            label="Mode de salaire de base"
            placeholder="Entrer un salaire"
            register={register}
            rules={{ required: true }}
            error={errors.salaire}
            inputType="number"
            inputDefaultValue=""
          />
        </div>
        <div className="p-6 border border-gray-300 shadow bg-white rounded-md">
          <span className="text-xl mb-5 col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            Contrat d'intégration :
          </span>
          <Controller
            name="contrat"
            control={control}
            rules={{ required: 'Veuillez ajouter un fichier' }}
            render={({ field }) => (
              <FileUploader
                title="Contrat de travail"
                name="contrat"
                setValue={setValue}
                onFileSelect={(file) => {
                  setContrat(file)
                  setValue('contrat', file, { shouldValidate: true })
                  field.onChange(file)
                }}
                error={
                  typeof errors.contrat?.message === 'string'
                    ? errors.contrat.message
                    : undefined
                }
                defaultFile={contrat}
              />
            )}
          />
        </div>

        <div className="w-full mt-20 flex gap-16 justify-center">
          <Button onClick={goBack} type="button" variant="outline" size="lg">
            <ChevronLeft /> Revenir
          </Button>

          <Button type="submit" variant="default" size="lg">
            {currentStepIndex === labels.length - 1 ? 'Valider' : 'Continuer'}
            <ChevronRight />
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
