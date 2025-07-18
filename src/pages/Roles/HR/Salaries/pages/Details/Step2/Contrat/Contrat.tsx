import FileUploader from '@/components/FileUploader/FileUploader'
import { ControlledInput } from '@/components/FormFeilds/ControlledInput/ControlledInput'
import { ControlledSelect } from '@/components/FormFeilds/ControlledSelect/ControlledSelect'
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import ValidateIntegrationModal from '../../components/Modals/ValidateIntegrationModal/ValidateIntegrationModal'

export interface IContractInfo {
  poste: string
  type_de_contrat: string
  date_de_début: Date
  date_de_fin: Date
  matricule: string
  etablisment_de_sante: string
  service_de_sante: string
  salaire: number
  contrat: File
}

interface PropsType {
  currentStepIndex: number
  setCurrentStepIndex: (setCurrentStepIndex: number) => void
  labels: string[]
}

export default function Contrat({
  currentStepIndex,
  setCurrentStepIndex,
  labels,
}: PropsType) {
  // States
  const [ContractInfo, setContractInfo] = useState<IContractInfo>()
  const [activeValidateIntegrationModal, setActiveValidateIntegrationModal] =
    useState<boolean>(false)
  const [contrat, setContrat] = useState<File>()
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

  // handle go back
  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  // handle form submit
  const onSubmit = (data: IContractInfo) => {
    console.log(data)
    setContractInfo(data)
    setActiveValidateIntegrationModal(true)
  }

  useEffect(() => {
    register('contrat', {
      required: 'Ce champ est requis',
      validate: {
        size: (file: File) =>
          file && file.size <= 10 * 1024 * 1024
            ? true
            : 'Le fichier doit faire moins de 10 Mo',
      },
    })

    if (contrat) setValue('contrat', contrat)
  }, [contrat, register, setValue])

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
      <CustomModal
        openModal={activeValidateIntegrationModal}
        setOpenModal={setActiveValidateIntegrationModal}>
        <ValidateIntegrationModal
          setActiveValidateIntegrationModal={setActiveValidateIntegrationModal}
          data={ContractInfo}
        />
      </CustomModal>
    </FormProvider>
  )
}
