import FileUploader from '@/components/FileUploader/FileUploader'
import { ControlledSelect } from '@/components/FormFeilds/ControlledSelect/ControlledSelect'
import { ControlledTextarea } from '@/components/FormFeilds/ControlledTextarea/ControlledTextarea '
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import PagePath from '@/components/PagePath/PagePath'
import { Button } from '@/components/ui/button'
import { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import SendRequestModal from './componsnts/SendRequestModal'
import { ControlledInput } from '@/components/FormFeilds/ControlledInput/ControlledInput'
import SelectUser from './componsnts/SelectUser'
import { countBusinessDaysInMonth } from '@/lib/countBusinessDaysInMonth'
import axios from 'axios'

export interface IRestauForm {
  user_id: string
  nbr_jr: string
  annee: number
  mois: string
  note: string
  justificatif: File
}

export default function Add() {
  // naviagte
  const navigate = useNavigate()

  // states
  const [formData, setFormData] = useState<IRestauForm | undefined>()
  const [justificatif, setJustificatif] = useState<File>()
  const [activeSendRequestModal, setActiveSendRequestModal] =
    useState<boolean>(false)
  const [totalAbsneceCurrentMonth, setTotalAbsneceCurrentMonth] =
    useState<number>()
  const [userId, setUserId] = useState<string>('')

  // react hook form
  const methods = useForm<IRestauForm>({
    mode: 'onBlur',
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    clearErrors,
    setError,
  } = methods

  const onSubmit = (data: IRestauForm) => {
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

  // fetch
  const fetchMonthTotalAbsences = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/absences/total-conge/${userId}?month=${9}&year=${2025}`
      )
      console.log(response)
      setTotalAbsneceCurrentMonth(response.data.totalCongeApprouve)
    } catch (error) {
      console.log(error)
    }
  }, [userId])

  useEffect(() => {
    register('justificatif', {
      validate: (file: File | undefined) =>
        !file ||
        file.size <= 10 * 1024 * 1024 ||
        'Le fichier doit faire moins de 10 Mo',
    })

    if (justificatif) setValue('justificatif', justificatif)
  }, [justificatif, register, setValue])

  const watchedMonth = methods.watch('mois')
  const watchedYear = methods.watch('annee')

  useEffect(() => {
    if (watchedMonth && watchedYear) {
      const monthMap: Record<string, number> = {
        janvier: 1,
        fevrier: 2,
        mars: 3,
        avril: 4,
        mai: 5,
        juin: 6,
        juillet: 7,
        aout: 8,
        septembre: 9,
        octobre: 10,
        novembre: 11,
        decembre: 12,
      }

      const monthNum = monthMap[watchedMonth.toLowerCase()]
      const yearNum = parseInt(watchedYear.toString(), 10)

      if (monthNum && yearNum) {
        const businessDays = countBusinessDaysInMonth(yearNum, monthNum)
        const totalAbsences = totalAbsneceCurrentMonth ?? 0
        const result = businessDays - totalAbsences
        setValue('nbr_jr', result.toString())
      }
    }
  }, [watchedMonth, watchedYear, setValue, totalAbsneceCurrentMonth])

  useEffect(() => {
    fetchMonthTotalAbsences() // Initial fetch
  }, [fetchMonthTotalAbsences])

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
            <SelectUser
              setValue={setValue}
              errors={errors}
              isSubmitting={isSubmitting}
              clearErrors={clearErrors}
              setError={setError}
              setUserId={setUserId}
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
                required={false}
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
