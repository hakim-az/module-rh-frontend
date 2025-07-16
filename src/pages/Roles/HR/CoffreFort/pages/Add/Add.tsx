import FileUploader from '@/components/FileUploader/FileUploader'
import { ControlledSelect } from '@/components/FormFeilds/ControlledSelect/ControlledSelect'
import { ControlledTextarea } from '@/components/FormFeilds/ControlledTextarea/ControlledTextarea '
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import PagePath from '@/components/PagePath/PagePath'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import SendRequestModal from './componsnts/SendRequestModal'

export interface ICoffre {
  salarie: number
  type: string
  annee: number
  mois: string
  note: string
  justificatif: File
}

export default function Add() {
  // naviagte
  const navigate = useNavigate()

  // states
  const [formData, setFormData] = useState<ICoffre | undefined>()
  const [justificatif, setJustificatif] = useState<File>()
  const [activeSendRequestModal, setActiveSendRequestModal] =
    useState<boolean>(false)

  // react hook form
  const methods = useForm<ICoffre>({
    mode: 'onBlur',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = methods

  const onSubmit = (data: ICoffre) => {
    console.log(data)
    setFormData(data)
    setActiveSendRequestModal(true)
  }

  const currentYear = new Date().getFullYear()
  const startYear = currentYear - 10 // 10 ans avant
  const endYear = currentYear + 10 // 10 ans après

  const yearsItems = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
    const year = startYear + i
    return { label: year.toString(), value: year.toString() }
  })

  useEffect(() => {
    register('justificatif', {
      required: 'Ce champ est requis',
      validate: {
        size: (file: File) =>
          file && file.size <= 10 * 1024 * 1024
            ? true
            : 'Le fichier doit faire moins de 10 Mo',
      },
    })

    if (justificatif) setValue('justificatif', justificatif)
  }, [justificatif, register, setValue])

  return (
    <>
      <PagePath />
      <FormProvider {...methods}>
        <form
          className="w-11/12 max-w-[1280px] pb-20 mt-5 mx-auto gap-10 flex flex-col "
          onSubmit={handleSubmit(onSubmit)}>
          {/* Informations bancaire : */}
          <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-10 gap-y-8 rounded-md border border-gray-200 shadow-md w-full">
            {/* Salarié */}
            <ControlledSelect
              name="salarie"
              label="Salarié"
              placeholder="Sélectionner un salarié"
              control={control}
              rules={{ required: true }}
              items={[
                { label: 'Camille Dupont', value: '1' },
                { label: 'Lucas Moreau', value: '2' },
                { label: 'Chloé Bernard', value: '3' },
                { label: 'Thomas Lefèvre', value: '4' },
                { label: 'Élise Fontaine', value: '5' },
                { label: 'Nathan Girard', value: '6' },
                { label: 'Sophie Marchand', value: '7' },
              ]}
              error={errors.salarie}
              selectDefaultValue=""
            />
            {/* Type de bulletin */}
            <ControlledSelect
              name="type"
              label="Type de bulletin"
              placeholder="Type de bulletin"
              control={control}
              rules={{ required: true }}
              items={[
                {
                  label: 'Bulletin de salaire mensuel',
                  value: 'salaire_mensuel',
                },
                {
                  label: 'Prime exceptionnelle',
                  value: 'prime_exceptionnelle',
                },
                {
                  label: 'Indemnité de transport',
                  value: 'indemnite_transport',
                },
                {
                  label: 'Remboursement frais professionnels',
                  value: 'remboursement_frais',
                },
                {
                  label: 'Heures supplémentaires',
                  value: 'heures_supplementaires',
                },
                { label: 'Bonus de performance', value: 'bonus_performance' },
                {
                  label: 'Bulletin de régularisation',
                  value: 'bulletin_regularisation',
                },
              ]}
              error={errors.type}
              selectDefaultValue=""
            />
            {/* Mois */}
            <ControlledSelect
              name="mois"
              label="Mois"
              placeholder="Mois"
              control={control}
              rules={{ required: true }}
              items={[
                { label: 'Janvier', value: 'janvier' },
                { label: 'Février', value: 'fevrier' },
                { label: 'Mars', value: 'mars' },
                { label: 'Avril', value: 'avril' },
                { label: 'Mai', value: 'mai' },
                { label: 'Juin', value: 'juin' },
                { label: 'Juillet', value: 'juillet' },
                { label: 'Août', value: 'aout' },
                { label: 'Septembre', value: 'septembre' },
                { label: 'Octobre', value: 'octobre' },
                { label: 'Novembre', value: 'novembre' },
                { label: 'Décembre', value: 'decembre' },
              ]}
              error={errors.mois}
              selectDefaultValue=""
            />
            {/* Année */}
            <ControlledSelect
              name="annee"
              label="Année"
              placeholder="Année"
              control={control}
              rules={{ required: true }}
              items={yearsItems}
              error={errors.annee}
              selectDefaultValue=""
            />
            {/* Note */}
            <div className="lg:col-span-2">
              <ControlledTextarea
                name="note"
                label="Note"
                placeholder="Entrez votre note ici"
                register={register}
                error={errors.note}
              />
            </div>
            {/* justificatif */}
            <div className="lg:col-span-2">
              <FileUploader
                title="Pièce justificatif"
                name="justificatif"
                setValue={setValue}
                onFileSelect={setJustificatif}
                error={
                  typeof errors.justificatif?.message === 'string'
                    ? errors.justificatif.message
                    : undefined
                }
                defaultFile={justificatif ?? undefined}
              />
            </div>
          </div>
          <div className="w-full flex gap-16 justify-center">
            {/* revenir */}
            <Button
              type="button"
              variant="outline"
              size={'lg'}
              onClick={() => navigate('/accueil/absences')}>
              Annuler
            </Button>
            {/* continuer */}
            <Button type="submit" variant="default" size={'lg'}>
              Ajouter
            </Button>
          </div>
        </form>
      </FormProvider>
      <CustomModal
        openModal={activeSendRequestModal}
        setOpenModal={setActiveSendRequestModal}>
        <SendRequestModal
          setActiveSendRequestModal={setActiveSendRequestModal}
          data={formData}
        />
      </CustomModal>
    </>
  )
}
