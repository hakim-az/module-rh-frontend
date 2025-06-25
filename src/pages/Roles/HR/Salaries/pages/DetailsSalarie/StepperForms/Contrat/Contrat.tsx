import FileUploader from '@/components/FileUploader/FileUploader'
import { ControlledInput } from '@/components/FormFeilds/ControlledInput/ControlledInput'
import { ControlledSelect } from '@/components/FormFeilds/ControlledSelect/ControlledSelect'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

interface IContractInfo {
  poste: string
  type_de_contrat: string
  date_de_début: Date
  date_de_fin: Date
  etablisment_de_sante: string
  service_de_sante: string
  salaire: number
  contract: File
}

interface PropsType {
  currentStepIndex: number
  setActiveValidateIntegrationModal: (
    activeValidateIntegrationModal: boolean
  ) => void
  setCurrentStepIndex: (setCurrentStepIndex: number) => void
  labels: string[]
  goNext: () => void
  goBack: () => void
}

export default function Contrat({
  currentStepIndex,
  setCurrentStepIndex,
  setActiveValidateIntegrationModal,
  labels,
  goNext,
  goBack,
}: PropsType) {
  // States
  const [ContractInfo, setContractInfo] = useState<IContractInfo>()
  const [contractFile, setContractFile] = useState<File>()
  // react hook form
  const methods = useForm<IContractInfo>({
    mode: 'onBlur',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = methods

  // handle form submit
  const onSubmit = (data: IContractInfo) => {
    console.log(data)
    setContractInfo(data)
    goNext()
    if (currentStepIndex === labels.length - 1) {
      setActiveValidateIntegrationModal(true)
    } else {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  console.log('ContractInfo', ContractInfo)
  console.log('contractFile', contractFile)

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
            name="contract"
            control={control}
            rules={{ required: 'Veuillez ajouter un fichier' }}
            render={({ field }) => (
              <FileUploader
                title="Contrat de travail"
                name="contract"
                setValue={setValue}
                onFileSelect={(file) => {
                  setContractFile(file)
                  setValue('contract', file, { shouldValidate: true })
                  field.onChange(file)
                }}
                error={
                  typeof errors.contract?.message === 'string'
                    ? errors.contract.message
                    : undefined
                }
                defaultFile={contractFile}
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
