import { ControlledInput } from '@/components/FormFeilds/ControlledInput/ControlledInput'
import { ControlledSelect } from '@/components/FormFeilds/ControlledSelect/ControlledSelect'
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import PagePath from '@/components/PagePath/PagePath'
import { Button } from '@/components/ui/button'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import UpdateInfosProModal from './components/UpdateInfosProModal'

export interface IFormData {
  iban: string
  bic: string
  nom_complet: string
  lien_avec_salarie: string
  tel: string
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
          {/* Informations bancaire : */}
          <div className="grid bg-white grid-cols-1 items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Informations bancaire :
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
              inputDefaultValue={userDetails?.paiement?.iban}
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
              inputDefaultValue={userDetails?.paiement?.bic}
            />
          </div>
          {/* Contact d'urgence */}
          <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
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
              inputDefaultValue={userDetails?.urgence?.nomComplet}
            />
            {/* Lien avec le salarié */}
            <ControlledSelect
              name="lien_avec_salarie"
              label="Lien avec le salarié "
              placeholder="Lien avec le salarié "
              control={control}
              rules={{ required: true }}
              items={[
                { label: 'Conjoint(e)', value: 'conjoint' },
                { label: 'Père', value: 'pere' },
                { label: 'Mère', value: 'mere' },
                { label: 'Frère', value: 'frere' },
                { label: 'Sœur', value: 'soeur' },
                { label: 'Enfant', value: 'enfant' },
                { label: 'Autre membre de la famille', value: 'autre' },
              ]}
              error={errors.lien_avec_salarie}
              selectDefaultValue={userDetails?.urgence?.lienAvecLeSalarie ?? ''}
            />
            {/* Téléphone */}
            <ControlledInput
              name="tel"
              label="Téléphone"
              placeholder="0 7 77 77 77 77"
              register={register}
              rules={{ required: true }}
              error={errors.tel}
              inputType="number"
              inputDefaultValue={userDetails?.urgence?.telephone}
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
        <UpdateInfosProModal
          setActiveSendRequestModal={setActiveSendRequestModal}
          data={formData}
        />
      </CustomModal>
    </>
  )
}
