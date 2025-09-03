import FileUploader from '@/components/FileUploader/FileUploader'
import { ControlledSelect } from '@/components/FormFeilds/ControlledSelect/ControlledSelect'
import { ControlledTextarea } from '@/components/FormFeilds/ControlledTextarea/ControlledTextarea '
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import PagePath from '@/components/PagePath/PagePath'
import { Button } from '@/components/ui/button'
import { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ControlledInput } from '@/components/FormFeilds/ControlledInput/ControlledInput'

import axios from 'axios'
import { downloadFile } from '@/lib/downloadFile'
import DisplayInput from '@/components/DisplayInput/DisplayInput'
import { Download } from 'lucide-react'
import PDFIcon from '@/assets/icons/pdf-icon.png'
import UpdateTitreRestau from './componsnts/UpdateTitreRestau'
import type { ITitreRestau } from '@/types/tables/rh'

export interface IRestauForm {
  salarie: number
  nbr_jr: string
  annee: number
  mois: string
  note: string
  justificatif: File
}

export default function Add() {
  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  // naviagte
  const navigate = useNavigate()

  // states
  const [formData, setFormData] = useState<IRestauForm | undefined>()
  const [justificatif, setJustificatif] = useState<File>()
  const [activeUpdateTitreRestau, setActiveUpdateTitreRestau] =
    useState<boolean>(false)

  // react hook form
  const methods = useForm<IRestauForm>({
    mode: 'onBlur',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = methods

  const onSubmit = (data: IRestauForm) => {
    setFormData(data)
    setActiveUpdateTitreRestau(true)
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

  const { idTitre } = useParams()

  const [isLoadingFetch, setIsLoadingFetch] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [titreRestauDetails, setTitreRestauDetails] = useState<ITitreRestau>()

  // fetch designs
  const fetchAbsences = useCallback(async () => {
    try {
      setIsLoadingFetch(true)
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/restaux/${idTitre}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setTitreRestauDetails(response.data)

      setIsLoadingFetch(false)
    } catch (error) {
      setIsLoadingFetch(false)
      console.log(error)
    }
  }, [idTitre, token])

  // donload file
  const handleDownload = useCallback(async () => {
    if (!titreRestauDetails?.fichierJustificatifPdf) return

    setIsLoading(true)
    try {
      await downloadFile(titreRestauDetails.fichierJustificatifPdf)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [titreRestauDetails])

  useEffect(() => {
    if (titreRestauDetails) {
      methods.reset({
        nbr_jr: titreRestauDetails.nbrJours || '',
        mois: titreRestauDetails.mois.toLocaleLowerCase() || '',
        annee: Number(titreRestauDetails.annee) || 0,
        note: titreRestauDetails.note || '',
        justificatif: justificatif as File,
      })
    }
  }, [titreRestauDetails, justificatif, methods])

  useEffect(() => {
    fetchAbsences() // Initial fetch
  }, [fetchAbsences])

  return (
    <>
      <PagePath />
      <FormProvider {...methods}>
        {isLoadingFetch ? (
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
                  titreRestauDetails?.user
                    ? `${titreRestauDetails?.user?.nomDeNaissance} ${titreRestauDetails?.user?.prenom}`
                    : '-'
                }
              />
              {/* Nombre de jours ouvrés */}
              <ControlledInput
                name="nbr_jr"
                label="Nombre de jours ouvrés"
                placeholder="Nombre de jours ouvrés"
                register={register}
                rules={{ required: true }}
                error={errors.nbr_jr}
                inputType="number"
                inputDefaultValue=""
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
                  {isLoading ? (
                    <>Loading...</>
                  ) : (
                    <Download
                      onClick={() => handleDownload()}
                      className="hover:text-blue-500 cursor-pointer transition-all ease-in-out delay-75"
                      size={32}
                    />
                  )}
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
        openModal={activeUpdateTitreRestau}
        setOpenModal={setActiveUpdateTitreRestau}>
        <UpdateTitreRestau
          setActiveUpdateTitreRestau={setActiveUpdateTitreRestau}
          data={formData}
        />
      </CustomModal>
    </>
  )
}
