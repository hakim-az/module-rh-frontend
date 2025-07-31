import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { ControlledSelect } from '@/components/FormFeilds/ControlledSelect/ControlledSelect'
import { ControlledInput } from '@/components/FormFeilds/ControlledInput/ControlledInput'
import { useIntegrationFormDataContext } from '@/contexts/CompleteProfile/IntegrationForm/useIntegrationFormDataContext'
import type { EmployeePersonalInformations } from '@/contexts/CompleteProfile/IntegrationForm/IntegrationFormContext'
import { countriesData } from '@/components/__mock__/Countries'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import DisplayInput from '@/components/DisplayInput/DisplayInput'

// types
interface PropsType {
  currentStepIndex: number
  setActiveValidateIntegrationModal: (
    activeValidateIntegrationModal: boolean
  ) => void
  setCurrentStepIndex: (setCurrentStepIndex: number) => void
  labels: string[]
}

export default function InfosPerso({
  currentStepIndex,
  setActiveValidateIntegrationModal,
  setCurrentStepIndex,
  labels,
}: PropsType) {
  // integration form context
  const { employeePersonalInfo, setEmployeePersonalInfo } =
    useIntegrationFormDataContext()
  const { userDetails } = useDashboardContext()

  // react hook form
  const methods = useForm<EmployeePersonalInformations>({
    mode: 'onBlur',
    defaultValues: {
      civilite: employeePersonalInfo.civilite,
      situation_familiale: employeePersonalInfo.situation_familiale,
      pays_de_naissance: employeePersonalInfo.pays_de_naissance,
      pays_de_nationalite: employeePersonalInfo.pays_de_nationalite,
      pays: employeePersonalInfo.pays,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = methods

  // handle form submit
  const onSubmit = (data: EmployeePersonalInformations) => {
    console.log(data)
    setEmployeePersonalInfo(data)
    if (currentStepIndex === labels.length - 1) {
      setActiveValidateIntegrationModal(true)
    } else {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  // handle go back
  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        className="w-full mx-auto gap-10 flex flex-col "
        onSubmit={handleSubmit(onSubmit)}>
        {/* identité */}
        <div className="grid grid-cols-1 items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            Identité :
          </span>
          {/* civilité */}
          <ControlledSelect
            name="civilite"
            label="Civilité"
            placeholder="Civilité"
            control={control}
            rules={{ required: true }}
            items={[
              { label: 'M.', value: 'm' },
              { label: 'Mme.', value: 'mme' },
            ]}
            error={errors.civilite}
            selectDefaultValue={employeePersonalInfo.civilite}
          />
          {/* Prénom */}
          <DisplayInput label="Prénom" value={userDetails?.prenom ?? '-'} />
          {/* Nom de naissance */}
          <DisplayInput
            label="Nom de naissance"
            value={userDetails?.nomDeNaissance ?? '-'}
          />
          {/* Nom usuel */}
          <ControlledInput
            name="nom_usuel"
            label="Nom usuel"
            placeholder="Entrer un nom usuel"
            register={register}
            rules={{ required: true }}
            error={errors.nom_usuel}
            inputType="text"
            inputDefaultValue={employeePersonalInfo.nom_usuel}
          />
          {/* Situation familiale */}
          <ControlledSelect
            name="situation_familiale"
            label="Situation familiale"
            placeholder="Situation familiale"
            control={control}
            rules={{ required: true }}
            items={[
              { label: 'Célibataire', value: 'celibataire' },
              { label: 'Marié(e)', value: 'marie' },
              { label: 'Pacsé(e)', value: 'pacse' },
              { label: 'Divorcé(e)', value: 'divorce' },
              { label: 'Veuf(ve)', value: 'veuf' },
              { label: 'Concubinage', value: 'concubinage' },
            ]}
            error={errors.situation_familiale}
            selectDefaultValue={employeePersonalInfo.situation_familiale}
          />
          {/* Numéro de sécurité sociale */}
          <ControlledInput
            name="numero_ssr"
            label=" Numéro de sécurité sociale"
            placeholder="Entrer un  numéro de sécurité sociale"
            register={register}
            rules={{ required: true }}
            error={errors.numero_ssr}
            inputType="number"
            inputDefaultValue={employeePersonalInfo.numero_ssr}
          />
        </div>
        {/* Naissance et nationalité : */}
        <div className="grid grid-cols-1 items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            Naissance et nationalité :
          </span>
          {/* Date de naissance */}
          <ControlledInput
            name="date_de_naissance"
            label=" Date de naissance"
            placeholder="Entrer une date de naissance"
            register={register}
            rules={{ required: true }}
            error={errors.date_de_naissance}
            inputType="date"
            inputDefaultValue={employeePersonalInfo.date_de_naissance}
          />
          {/* Pays de naissance */}
          <ControlledSelect
            name="pays_de_naissance"
            label="Pays de naissance"
            placeholder="Pays de naissance"
            control={control}
            rules={{ required: true }}
            items={countriesData}
            error={errors.pays_de_naissance}
            selectDefaultValue={employeePersonalInfo.pays_de_naissance}
          />
          {/* Départmemnt de naissance */}
          <ControlledInput
            name="departement_de_naissance"
            label="Départmemnt de naissance"
            placeholder="Entrer un départmemnt de naissance"
            register={register}
            rules={{ required: true }}
            error={errors.departement_de_naissance}
            inputType="text"
            inputDefaultValue={employeePersonalInfo.departement_de_naissance}
          />
          {/* commune de naissance */}
          <ControlledInput
            name="commune_de_naissance"
            label="Commune de naissance"
            placeholder="Entrer un commune de naissance"
            register={register}
            rules={{ required: true }}
            error={errors.commune_de_naissance}
            inputType="text"
            inputDefaultValue={employeePersonalInfo.commune_de_naissance}
          />
          {/* Pays de nationalité */}
          <ControlledSelect
            name="pays_de_nationalite"
            label="Pays de nationalité"
            placeholder="Pays de nationalité"
            control={control}
            rules={{ required: true }}
            items={countriesData}
            error={errors.pays_de_nationalite}
            selectDefaultValue={employeePersonalInfo.pays_de_nationalite}
          />
        </div>
        {/* coordonnées & adresse */}
        <div className="grid grid-cols-1 items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            Coordonnées :
          </span>
          {/* E-mail personnelle */}
          <DisplayInput
            label="E-mail personnelle"
            value={userDetails?.emailPersonnel ?? '-'}
          />
          {/* E-mail professionnel */}
          <ControlledInput
            name="email_pro"
            label="E-mail professionnel"
            placeholder="Entrer un E-mail professionnel"
            register={register}
            rules={{
              required: 'Ce champ est requis',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            }}
            error={errors.email_pro}
            inputType="email"
            inputDefaultValue={employeePersonalInfo.email_pro}
          />
          {/* Téléphone portable personnelle */}
          <DisplayInput
            label="Téléphone portable personnelle"
            value={userDetails?.telephonePersonnel ?? '-'}
          />
          {/* Téléphone portable professionnel */}
          <ControlledInput
            name="tel_pro"
            label="Téléphone portable personnelle "
            placeholder="0 7 77 77 77 77"
            register={register}
            rules={{
              required: 'Ce champ est requis',
              pattern: {
                value: /^\d{10}$/,
                message: 'Le numéro doit contenir exactement 10 chiffres',
              },
            }}
            error={errors.tel_pro}
            inputType="number"
            inputDefaultValue={employeePersonalInfo.tel_pro}
          />
          {/* adresse */}
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            Adresse :
          </span>
          {/* Pays */}
          <ControlledSelect
            name="pays"
            label="Pays"
            placeholder="Pays"
            control={control}
            rules={{ required: true }}
            items={countriesData}
            error={errors.pays}
            selectDefaultValue={employeePersonalInfo.pays}
          />
          {/* Code postal */}
          <ControlledInput
            name="code_postal"
            label="Code postal"
            placeholder="75000"
            register={register}
            rules={{
              required: 'Ce champ est requis',
              pattern: {
                value: /^[0-9]{1,5}$/,
                message: 'Le code postal doit contenir jusqu’à 5 chiffres',
              },
            }}
            error={errors.code_postal}
            inputType="number"
            inputDefaultValue={employeePersonalInfo.code_postal}
          />

          {/* Ville */}
          <ControlledInput
            name="ville"
            label="Ville"
            placeholder="Entrer une ville"
            register={register}
            rules={{ required: true }}
            error={errors.ville}
            inputType="text"
            inputDefaultValue={employeePersonalInfo.ville}
          />
          {/* Adresse */}
          <ControlledInput
            name="adresse"
            label="Adresse"
            placeholder="Entrer une adresse"
            register={register}
            rules={{ required: true }}
            error={errors.adresse}
            inputType="text"
            inputDefaultValue={employeePersonalInfo.adresse}
          />
          {/* Complément d'adresse */}
          <ControlledInput
            name="complement_adresse"
            label="Complément d'adresse "
            placeholder="Entrer un complément d'adresse "
            register={register}
            rules={{ required: true }}
            error={errors.complement_adresse}
            inputType="text"
            inputDefaultValue={employeePersonalInfo.complement_adresse}
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
    </FormProvider>
  )
}
