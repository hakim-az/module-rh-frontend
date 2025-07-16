import FileUploader from '@/components/FileUploader/FileUploader'
import { ControlledInput } from '@/components/FormFeilds/ControlledInput/ControlledInput'
import { ControlledSelect } from '@/components/FormFeilds/ControlledSelect/ControlledSelect'
import { ControlledTextarea } from '@/components/FormFeilds/ControlledTextarea/ControlledTextarea '
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import PagePath from '@/components/PagePath/PagePath'
import { Button } from '@/components/ui/button'
import { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import SendRequestModal from './componsnts/UpdateAbsenceModel'
import type { IAbsence } from '../Home/components/AbsencesTable'
import axios from 'axios'
import { downloadFile } from '@/lib/downloadFile'
import { Download } from 'lucide-react'
import PDFIcon from '@/assets/icons/pdf-icon.png'

export interface IAbsenceForm {
  type: string
  date_debut: string
  date_fin: string
  note: string
  justificatif: File
}

export default function Update() {
  // naviagte
  const navigate = useNavigate()

  // states
  const [formData, setFormData] = useState<IAbsenceForm | undefined>()
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
    setFormData(data)
    setActiveSendRequestModal(true)
  }

  useEffect(() => {
    register('justificatif', {
      validate: (file: File | undefined) =>
        !file ||
        file.size <= 10 * 1024 * 1024 ||
        'Le fichier doit faire moins de 10 Mo',
    })

    if (justificatif) setValue('justificatif', justificatif)
  }, [justificatif, register, setValue])

  const { absenceId } = useParams()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [absenceDetails, setAbsenceDetails] = useState<IAbsence>()

  // fetch designs
  const fetchAbsences = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/absences/${absenceId}`
      )
      console.log(response)
      setAbsenceDetails(response.data)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }, [absenceId])

  // donload file
  const handleDownload = useCallback(async () => {
    if (!absenceDetails?.fichierJustificatifPdf) return

    setIsLoading(true)
    try {
      await downloadFile(absenceDetails.fichierJustificatifPdf)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [absenceDetails?.fichierJustificatifPdf])

  useEffect(() => {
    if (absenceDetails) {
      methods.reset({
        type: absenceDetails.typeAbsence || '',
        date_debut: absenceDetails.dateDebut?.split('T')[0] || '',
        date_fin: absenceDetails.dateFin?.split('T')[0] || '',
        note: absenceDetails.note || '',
        justificatif: justificatif as File,
      })
    }
  }, [absenceDetails, justificatif, methods])

  useEffect(() => {
    fetchAbsences() // Initial fetch
  }, [fetchAbsences])

  return (
    <>
      <PagePath />
      <FormProvider {...methods}>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <form
            className="w-11/12 max-w-[1280px] pb-20 mt-5 mx-auto gap-10 flex flex-col "
            onSubmit={handleSubmit(onSubmit)}>
            {/* Informations bancaire : */}
            <div className="grid grid-cols-1 bg-white items-end lg:grid-cols-2 p-7 gap-x-10 gap-y-8 rounded-md border border-gray-200 shadow-md w-full">
              {/* Type d'absence */}
              <div className="lg:col-span-2">
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
              <div className="lg:col-span-2">
                <ControlledTextarea
                  name="note"
                  label="Note"
                  placeholder="Entrez votre note ici"
                  register={register}
                  error={errors.note}
                  defaultValue=""
                />
              </div>
              {/* justificatif */}
              {absenceDetails?.fichierJustificatifPdf !== 'undefined' && (
                <div className="border h-[calc(100%-36px)] flex flex-col items-center justify-between p-4 border-gray-300 rounded shadow-2xs">
                  <div className="flex items-center gap-4">
                    <img src={PDFIcon} alt="pdf-icon" className="w-40" />
                  </div>
                  <div className="flex items-center justify-between w-full p-4">
                    <span className="font-semibold">Justificatif</span>
                    <Download
                      onClick={() => handleDownload()}
                      className="hover:text-blue-500 cursor-pointer transition-all ease-in-out delay-75"
                      size={32}
                    />
                  </div>
                </div>
              )}
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
                required={false}
              />
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
                Modifier
              </Button>
            </div>
          </form>
        )}
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
