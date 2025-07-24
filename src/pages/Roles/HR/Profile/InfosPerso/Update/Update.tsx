import { countriesData } from '@/components/__mock__/Countries'
import { ControlledInput } from '@/components/FormFeilds/ControlledInput/ControlledInput'
import { ControlledSelect } from '@/components/FormFeilds/ControlledSelect/ControlledSelect'
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import PagePath from '@/components/PagePath/PagePath'
import { Button } from '@/components/ui/button'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import UpdateInfosPersoModal from './components/UpdateInfosPersoModal'

export interface IFormData {
  email_perso: string
  email_pro: string
  tel_perso: string
  tel_pro: string
  pays: string
  code_postal: string
  ville: string
  adresse: string
  complement_adresse: string
}

export default function Update() {
  const { userDetails } = useDashboardContext()
  // naviagte
  const navigate = useNavigate()

  // states
  const [formData, setFormData] = useState<IFormData | undefined>()
  const [activeSendRequestModal, setActiveSendRequestModal] =
    useState<boolean>(false)

  // react hook form
  const methods = useForm<IFormData>({
    mode: 'onBlur',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = methods

  const onSubmit = (data: IFormData) => {
    console.log(data)
    setFormData(data)
    setActiveSendRequestModal(true)
  }

  return (
    <>
      <PagePath />
      <FormProvider {...methods}>
        <form
          className="w-11/12 max-w-[1280px] pb-20 mt-5 mx-auto gap-10 flex flex-col "
          onSubmit={handleSubmit(onSubmit)}>
          {/* coordonnées & adresse */}
          <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
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
                required: 'Ce champ est requis',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              }}
              error={errors.email_perso}
              inputType="email"
              inputDefaultValue={userDetails?.emailPersonnel}
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
              inputDefaultValue={userDetails?.emailProfessionnel}
            />
            {/* Téléphone portable personnelle */}
            <ControlledInput
              name="tel_perso"
              label="Téléphone portable personnelle"
              placeholder="07 77 77 77 77"
              register={register}
              rules={{
                required: 'Ce champ est requis',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Le numéro doit contenir exactement 10 chiffres',
                },
              }}
              error={errors.tel_perso}
              inputType="number"
              inputDefaultValue={userDetails?.telephonePersonnel}
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
              inputDefaultValue={userDetails?.telephoneProfessionnel}
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
              selectDefaultValue={userDetails?.adresse?.pays ?? '-'}
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
              inputDefaultValue={userDetails?.adresse?.codePostal}
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
              inputDefaultValue={userDetails?.adresse?.ville}
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
              inputDefaultValue={userDetails?.adresse?.adresse}
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
              inputDefaultValue={userDetails?.adresse?.complementAdresse}
            />
          </div>
          <div className="w-full flex gap-16 justify-center">
            {/* revenir */}
            <Button
              type="button"
              variant="outline"
              size={'lg'}
              onClick={() => navigate('/accueil/informations-personnelles')}>
              Annuler
            </Button>
            {/* continuer */}
            <Button type="submit" variant="default" size={'lg'}>
              Modifier
            </Button>
          </div>
        </form>
      </FormProvider>
      <CustomModal
        openModal={activeSendRequestModal}
        setOpenModal={setActiveSendRequestModal}>
        <UpdateInfosPersoModal
          setActiveSendRequestModal={setActiveSendRequestModal}
          data={formData}
        />
      </CustomModal>
    </>
  )
}
