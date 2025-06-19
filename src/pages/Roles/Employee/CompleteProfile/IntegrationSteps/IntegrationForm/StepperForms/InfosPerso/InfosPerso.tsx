import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { ControlledSelect } from '@/components/FormFeilds/ControlledSelect/ControlledSelect'
import { ControlledInput } from '@/components/FormFeilds/ControlledInput/ControlledInput'

interface PropsType {
  currentStepIndex: number
  setActiveValidateIntegrationModal: (
    activeValidateIntegrationModal: boolean
  ) => void
  setCurrentStepIndex: (setCurrentStepIndex: number) => void
  labels: string[]
}

type FormValues = {
  civilite: string
  prenom: string
  nom_de_naissance: string
  nom_usuel: string
  situation_familiale: string
  numero_ssr: string
  date_de_naissance: string
  pays_de_naissance: string
  departement_de_naissance: string
  commune_de_naissance: string
  pays_de_nationalite: string
  email_perso: string
  email_pro: string
  tel_perso: string
  tel_pro: string
  pays: string
  code_postal: string
  ville: string
  adresse: string
  complement_adresse: string
  fiscalement_hors_france: boolean
}

export default function InfosPerso({
  currentStepIndex,
  setActiveValidateIntegrationModal,
  setCurrentStepIndex,
  labels,
}: PropsType) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
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
        />
        {/* Prénom */}
        <ControlledInput
          name="prenom"
          label="Prénom"
          placeholder="Entrer un prénom"
          register={register}
          rules={{ required: true }}
          error={errors.prenom}
          inputType="text"
        />
        {/* Nom de naissance */}
        <ControlledInput
          name="nom_de_naissance"
          label="Nom de naissance"
          placeholder="Entrer un nom de naissance"
          register={register}
          rules={{ required: true }}
          error={errors.nom_de_naissance}
          inputType="text"
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
        />
        {/* Situation familiale */}
        <ControlledSelect
          name="situation_familiale"
          label="Situation familiale"
          placeholder="Situation familiale"
          control={control}
          rules={{ required: true }}
          items={[{ label: 'Célibataire.', value: 'celibataire' }]}
          error={errors.situation_familiale}
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
        />
        {/* Pays de naissance */}
        <ControlledSelect
          name="pays_de_naissance"
          label="Pays de naissance"
          placeholder="Pays de naissance"
          control={control}
          rules={{ required: true }}
          items={[{ label: 'France', value: 'fr' }]}
          error={errors.pays_de_naissance}
        />
        {/* Départmemnt de naissance */}
        <ControlledInput
          name="departement_de_naissance"
          label="Départmemnt de naissance"
          placeholder="Entrer un départmemnt de naissance"
          register={register}
          rules={{ required: true }}
          error={errors.departement_de_naissance}
          inputType="date"
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
        />
        {/* Pays de nationalité */}
        <ControlledSelect
          name="pays_de_nationalite"
          label="Pays de nationalité"
          placeholder="Pays de nationalité"
          control={control}
          rules={{ required: true }}
          items={[{ label: 'France', value: 'fr' }]}
          error={errors.pays_de_nationalite}
        />
      </div>
      {/* coordonnées & adresse */}
      <div className="grid grid-cols-1 items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Coordonnées :
        </span>
        {/* E-mail personnelle */}
        <ControlledInput
          name="email_perso"
          label="E-mail personnelle"
          placeholder="Entrer un E-mail personnelle"
          register={register}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          }}
          error={errors.email_perso}
          inputType="email"
        />
        {/* E-mail professionnel */}
        <ControlledInput
          name="email_pro"
          label="E-mail professionnel"
          placeholder="Entrer un E-mail professionnel"
          register={register}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          }}
          error={errors.email_pro}
          inputType="email"
        />
        {/* Téléphone portable personnelle */}
        <ControlledInput
          name="tel_perso"
          label="Téléphone portable personnelle "
          placeholder="+33 7 77 77 77 77"
          register={register}
          rules={{ required: true }}
          error={errors.tel_perso}
          inputType="number"
        />
        {/* Téléphone portable professionnel */}
        <ControlledInput
          name="tel_pro"
          label="Téléphone portable personnelle "
          placeholder="+33 7 77 77 77 77"
          register={register}
          rules={{ required: true }}
          error={errors.tel_pro}
          inputType="number"
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
          items={[{ label: 'France', value: 'fr' }]}
          error={errors.pays}
        />
        {/* Code postal */}
        <ControlledInput
          name="code_postal"
          label="Code postal"
          placeholder="75000"
          register={register}
          rules={{ required: true }}
          error={errors.code_postal}
          inputType="number"
        />
        {/* Ville */}
        <ControlledInput
          name="ville"
          label="Ville"
          placeholder="Entrer une ville"
          register={register}
          rules={{ required: true }}
          error={errors.ville}
          inputType="number"
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
        />
        {/* Domicilié fiscalement hors de France */}
        <div className="flex justify-start mt-2 w-full lg:col-span-2 items-center gap-3 ">
          <Checkbox
            checked={watch('fiscalement_hors_france')}
            onCheckedChange={(checked) =>
              setValue('fiscalement_hors_france', !!checked)
            }
            className="size-5"
            aria-label="Size small"
          />
          <Label htmlFor="complement_adresse">
            Domicilié fiscalement hors de France
          </Label>
        </div>
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
