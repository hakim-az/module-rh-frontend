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
import DownloadJustificatif from '@/components/DownloadJustificatif/DownloadJustificatif'
import DisplayPdf from '@/components/DisplayPdf/DisplayPdf'

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
  const [openPdfModal, setOpenPdfModal] = useState(false)
  const [fileUrl, setFileUrl] = useState<string | undefined>('')

  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

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
        `${import.meta.env.VITE_API_BASE_URL}/absences/${absenceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response)
      setAbsenceDetails(response.data)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }, [absenceId, token])

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
                    { label: 'Congés payés (CP)', value: 'conges_payes' },
                    { label: 'Congés sans solde', value: 'conges_sans_solde' },
                    { label: 'Congé maternité', value: 'conge_maternite' },
                    {
                      label: 'Congé paternité / second parent',
                      value: 'conge_paternite',
                    },
                    {
                      label: `Congé parental d'éducation`,
                      value: 'conge_parental',
                    },
                    { label: 'Congé adoption', value: 'conge_adoption' },
                    {
                      label: 'Congé maladie / arrêt maladie',
                      value: 'conge_maladie',
                    },
                    {
                      label: 'Congé longue maladie / longue durée',
                      value: 'conge_longue_maladie',
                    },
                    {
                      label: 'Accident du travail / maladie professionnelle',
                      value: 'accident_travail',
                    },
                    {
                      label:
                        'Congé de formation (CIF, CPF de transition, etc.)',
                      value: 'conge_formation',
                    },
                    {
                      label: 'Congé pour événements familiaux',
                      value: 'conge_evenement_familial',
                    },
                    { label: 'Congé sabbatique', value: 'conge_sabbatique' },
                    {
                      label: 'Congé de solidarité familiale',
                      value: 'conge_solidarite_familiale',
                    },
                    {
                      label: `Congé pour création d'entreprise`,
                      value: 'conge_creation_entreprise',
                    },
                    {
                      label: 'Congé de proche aidant',
                      value: 'conge_proche_aidant',
                    },
                    {
                      label: 'Repos compensateur de remplacement (RC)',
                      value: 'repos_compensateur',
                    },
                    {
                      label: 'Jours RTT (Réduction du Temps de Travail)',
                      value: 'jours_rtt',
                    },
                    {
                      label: 'Absence injustifiée / non autorisée',
                      value: 'absence_injustifiee',
                    },
                    { label: 'Retard', value: 'retard' },
                    {
                      label: 'Repos hebdomadaire / jours fériés',
                      value: 'repos_hebdomadaire',
                    },
                    {
                      label: 'Absence partielle (ex : demi-journée)',
                      value: 'absence_partielle',
                    },
                    {
                      label: 'Télétravail (absence du bureau)',
                      value: 'teletravail',
                    },
                    {
                      label:
                        'Congés exceptionnels supplémentaires (convention collective)',
                      value: 'conges_exceptionnels',
                    },
                    {
                      label: `Jour de pont offert par l'employeur`,
                      value: 'jour_pont',
                    },
                    {
                      label: 'Absence pour mission / déplacement professionnel',
                      value: 'absence_deplacement',
                    },
                    {
                      label: 'Absence pour rendez-vous médical',
                      value: 'absence_medicale',
                    },
                    {
                      label: 'Absence syndicale / délégation du personnel',
                      value: 'absence_syndicale',
                    },
                    { label: 'Absence pour grève', value: 'absence_greve' },
                    {
                      label: 'Absence pour don de jours',
                      value: 'absence_don_jours',
                    },
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
              <DownloadJustificatif
                file={absenceDetails?.fichierJustificatifPdf}
                setFileUrl={setFileUrl}
                setOpenPdfModal={setOpenPdfModal}
              />

              <DisplayPdf
                openModal={openPdfModal}
                setOpenModal={setOpenPdfModal}
                fileUrl={fileUrl}
              />
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
