import FileUploader from '@/components/FileUploader/FileUploader'
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import PagePath from '@/components/PagePath/PagePath'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import SendSignedContractModal from './SendSignedContractModal'
// import SendRequestModal from './componsnts/SendRequestModal'

export interface IContractForm {
  justificatif: File
}

export default function ContractUploader() {
  // naviagte
  const navigate = useNavigate()

  // states
  const [formData, setFormData] = useState<IContractForm | undefined>()
  const [justificatif, setJustificatif] = useState<File>()
  const [activeSendSignedContractModal, setActiveSendSignedContractModal] =
    useState<boolean>(false)

  // react hook form
  const methods = useForm<IContractForm>({
    mode: 'onBlur',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods

  const onSubmit = (data: IContractForm) => {
    setFormData(data)
    setActiveSendSignedContractModal(true)
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
            {/* justificatif */}
            <div className="col-span-2">
              <FileUploader
                title="Fichier du contrat"
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
              Envoyer
            </Button>
          </div>
        </form>
      </FormProvider>
      <CustomModal
        openModal={activeSendSignedContractModal}
        setOpenModal={setActiveSendSignedContractModal}>
        <SendSignedContractModal
          setActiveSendSignedContractModal={setActiveSendSignedContractModal}
          data={formData}
        />
      </CustomModal>
    </>
  )
}
