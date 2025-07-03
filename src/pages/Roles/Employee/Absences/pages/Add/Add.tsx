import FileUploader from '@/components/FileUploader/FileUploader'
import { ControlledInput } from '@/components/FormFeilds/ControlledInput/ControlledInput'
import { ControlledSelect } from '@/components/FormFeilds/ControlledSelect/ControlledSelect'
import { ControlledTextarea } from '@/components/FormFeilds/ControlledTextarea/ControlledTextarea '
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import PagePath from '@/components/PagePath/PagePath'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import SendRequestModal from './componsnts/SendRequestModal'

interface IAbsenceForm {
  type: string
  date_debut: Date
  date_fin: Date
  note: string
  justificatif: File
}

export default function Add() {
  // naviagte
  const navigate = useNavigate()

  // states
  const [justificatif, setJustificatif] = useState<File>()
  const [activeSendRequestModal, setActiveSendRequestModal] =
    useState<boolean>(false)

  // react hook form
  const methods = useForm<IAbsenceForm>({
    mode: 'onBlur',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = methods

  const onSubmit = (data: IAbsenceForm) => {
    console.log(data)
    setActiveSendRequestModal(true)
  }
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
            {/* Type d'absence */}
            <div className="col-span-2">
              <ControlledSelect
                name="type"
                label="Type d'absence"
                placeholder="Type d'absence"
                control={control}
                rules={{ required: true }}
                items={[
                  { label: 'Congé payé', value: 'conge_paye' },
                  { label: 'Congé maladie', value: 'conge_maladie' },
                  {
                    label: 'Congé maternité/paternité',
                    value: 'conge_maternite_paternite',
                  },
                  { label: 'Congé sans solde', value: 'conge_sans_solde' },
                  { label: 'RTT', value: 'rtt' },
                  { label: 'Formation', value: 'formation' },
                  { label: 'Autre', value: 'autre' },
                ]}
                error={errors.type}
                selectDefaultValue=""
              />
            </div>
            {/* Date de début */}
            <ControlledInput
              name="date_debut"
              label="Date de début"
              placeholder="Date de début"
              register={register}
              rules={{ required: true }}
              error={errors.date_debut}
              inputType="date"
              inputDefaultValue=""
            />
            {/* Date de fin */}
            <ControlledInput
              name="date_fin"
              label="Date de fin"
              placeholder="Date de fin"
              register={register}
              rules={{ required: true }}
              error={errors.date_fin}
              inputType="date"
              inputDefaultValue=""
            />
            {/* Note */}
            <div className="col-span-2">
              <ControlledTextarea
                name="note"
                label="Note"
                placeholder="Entrez votre note ici"
                register={register}
                error={errors.note}
              />
            </div>
            {/* justificatif */}
            <div className="col-span-2">
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
              Demander
            </Button>
          </div>
        </form>
      </FormProvider>
      <CustomModal
        openModal={activeSendRequestModal}
        setOpenModal={setActiveSendRequestModal}>
        <SendRequestModal
          setActiveSendRequestModal={setActiveSendRequestModal}
        />
      </CustomModal>
    </>
  )
}
