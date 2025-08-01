import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ToastNotification, { notify } from '@/lib/ToastNotification'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { FormProvider, useForm } from 'react-hook-form'
import ImageUploader from '@/components/ImageUploader/ImageUploader'

interface IFormData {
  avatar: File
}

interface PropsType {
  setActiveSendRequestModal: (activeSendRequestModal: boolean) => void
}

export default function UploadAvatarModal({
  setActiveSendRequestModal,
}: PropsType) {
  const { userDetails } = useDashboardContext()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // react hook form
  const methods = useForm<IFormData>({
    mode: 'onBlur',
  })

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods

  const onSubmit = async (data: IFormData) => {
    setIsLoading(true)
    try {
      const formData = new FormData()

      formData.append('avatar', data.avatar)

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/users/${userDetails?.id}/avatar`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      console.log(response)

      notify({
        message: 'Photo de profile ajouter avec success',
        type: 'success',
      })

      setTimeout(() => {
        navigate(0)
        setIsLoading(false)
      }, 100)
    } catch (error) {
      console.error(error)

      notify({
        message: 'Echec',
        type: 'error',
      })

      setIsLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col items-center justify-center w-full h-full section-email">
        {/* content */}
        <div className="w-full h-full section-title ">
          <h2 className="my-4 text-xl text-center font-semibold sm:text-2xl lg:text-4xl text-primaryblack">
            Ajouter une phote de profile
          </h2>
          <div className="col-span-2">
            <ImageUploader
              title="Photot de profil"
              name="avatar"
              required
              setValue={setValue}
              error={errors.avatar?.message}
              onImageSelect={(file) =>
                console.log('Avatar sélectionnée :', file)
              }
            />
          </div>
        </div>
        {/* buttons */}
        <div className="flex flex-col items-center justify-around w-full gap-4 mt-10 mb-6 md:flex-row md:justify-center md:gap-10">
          <button
            type="button"
            onClick={() => setActiveSendRequestModal(false)}
            className="w-2/3 py-2 text-sm border rounded md:w-1/3 lg:w-48 md:text-base text-primarygray border-primarygray">
            Annuler
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="w-2/3 disabled:cursor-not-allowed py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-blue-500 bg-blue-500">
            {isLoading ? 'Loading...' : 'Ajouter'}
          </button>
        </div>
        <ToastNotification />
      </form>
    </FormProvider>
  )
}
