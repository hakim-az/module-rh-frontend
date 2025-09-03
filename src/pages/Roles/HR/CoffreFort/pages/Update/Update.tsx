import FileUploader from '@/components/FileUploader/FileUploader'
import { ControlledSelect } from '@/components/FormFeilds/ControlledSelect/ControlledSelect'
import { ControlledTextarea } from '@/components/FormFeilds/ControlledTextarea/ControlledTextarea '
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import PagePath from '@/components/PagePath/PagePath'
import { Button } from '@/components/ui/button'
import { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import UpdateCoffreModal from './componsnts/UpdateCoffreModal'
import axios from 'axios'
import { downloadFile } from '@/lib/downloadFile'
import DisplayInput from '@/components/DisplayInput/DisplayInput'
import { Download } from 'lucide-react'
import PDFIcon from '@/assets/icons/pdf-icon.png'
import type { ICoffreFort } from '@/types/tables/rh'

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

  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  // states
  const [formData, setFormData] = useState<ICoffre | undefined>()
  const [justificatif, setJustificatif] = useState<File>()
  const [activeUpdateCoffreModal, setActiveUpdateCoffreModal] =
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
    setFormData(data)
    setActiveUpdateCoffreModal(true)
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
      validate: (file: File | undefined) =>
        !file ||
        file.size <= 10 * 1024 * 1024 ||
        'Le fichier doit faire moins de 10 Mo',
    })

    if (justificatif) setValue('justificatif', justificatif)
  }, [justificatif, register, setValue])

  const { idCoffre } = useParams()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [coffreDetails, setCoffreDetails] = useState<ICoffreFort>()

  // fetch designs
  const fetchAbsences = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/coffres/${idCoffre}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response)
      setCoffreDetails(response.data)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }, [idCoffre, token])

  // donload file
  const handleDownload = useCallback(async () => {
    if (!coffreDetails?.fichierJustificatifPdf) return

    setIsLoading(true)
    try {
      await downloadFile(coffreDetails.fichierJustificatifPdf)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [coffreDetails])

  useEffect(() => {
    if (coffreDetails) {
      methods.reset({
        type: coffreDetails.typeBulletin || '',
        mois: coffreDetails.mois || '',
        annee: Number(coffreDetails.annee) || 0,
        note: coffreDetails.note || '',
        justificatif: justificatif as File,
      })
    }
  }, [coffreDetails, justificatif, methods])

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
              {/* Salarié */}
              <DisplayInput
                label="Salarié"
                value={
                  coffreDetails?.user
                    ? `${coffreDetails?.user?.nomDeNaissance} ${coffreDetails?.user?.prenom}`
                    : '-'
                }
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
        openModal={activeUpdateCoffreModal}
        setOpenModal={setActiveUpdateCoffreModal}>
        <UpdateCoffreModal
          setActiveUpdateCoffreModal={setActiveUpdateCoffreModal}
          data={formData}
        />
      </CustomModal>
    </>
  )
}
