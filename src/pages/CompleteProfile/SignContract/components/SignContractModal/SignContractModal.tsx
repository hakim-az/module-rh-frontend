import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import ToastNotification, { notify } from '@/lib/ToastNotification'
import { CheckCircleIcon } from '@heroicons/react/16/solid'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface PropsType {
  setActiveSignContractModal: (activeSignContractModal: boolean) => void
}

export default function SignContractModal({
  setActiveSignContractModal,
}: PropsType) {
  const { userDetails } = useDashboardContext()

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  const SendSignatureRequest = async () => {
    setIsLoading(true)
    try {
      if (
        !userDetails?.id ||
        !userDetails?.prenom ||
        !userDetails?.nomDeNaissance ||
        !userDetails?.emailPersonnel ||
        !userDetails?.contrat?.fichierContratNonSignerPdf
      ) {
        notify({
          message: 'Informations utilisateur incomplètes pour la signature',
          type: 'error',
        })
        setIsLoading(false)
        return
      }

      const payload = {
        idUser: userDetails.id,
        firstName: userDetails.prenom,
        lastName: userDetails.nomDeNaissance,
        email: userDetails.emailPersonnel,
        pdfUrl: userDetails.contrat.fichierContratNonSignerPdf,
      }

      // 🔹 Define endpoint by role/post
      let endpoint = '/signature' // default
      switch (userDetails.contrat.typeContrat) {
        case 'commercial':
          endpoint = '/signature-commercial'
          break
        default:
          endpoint = ''
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response)

      notify({
        message: 'Email envoyé avec succès',
        type: 'success',
      })

      setTimeout(() => {
        navigate(0)
        setIsLoading(false)
      }, 200)
    } catch (error) {
      console.error("Erreur lors de l'envoi de la signature:", error)

      notify({
        message: 'Échec de la demande de signature',
        type: 'error',
      })

      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full section-email">
      {/* Hero icon */}
      <CheckCircleIcon className="w-1/3 md:w-1/4 lg:w-1/5 fill-green-500" />
      {/* content */}
      <div className="w-full h-full section-title ">
        <h2 className="my-4 text-xl text-center font-semibold sm:text-2xl lg:text-4xl text-primaryblack">
          Signer le contrat de travail
        </h2>
        <p className="w-full md:w-3/4 text-gray-400 lg:w-4/5 mx-auto font-normal text-sm leading-[1.3rem] sm:text-base lg:text-lg text-subColor text-center">
          En validant cette étape, vous acceptez les termes de votre contrat de
          travail.Assurez-vous d'avoir lu attentivement l'intégralité du
          document avant de signer.Une fois signé, le contrat sera envoyé au
          service RH pour validation finale.
        </p>
      </div>
      {/* buttons */}
      <div className="flex flex-col items-center justify-around w-full gap-4 mt-10 mb-6 md:flex-row md:justify-center md:gap-10">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => setActiveSignContractModal(false)}
          className="w-2/3 py-2 disabled:cursor-not-allowed text-sm border rounded md:w-1/3 lg:w-48 md:text-base text-primarygray border-primarygray">
          Annuler
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            SendSignatureRequest()
          }}
          className="w-2/3 py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-green-500 bg-green-500">
          {isLoading ? 'Loading...' : 'Valider'}
        </button>
      </div>
      <ToastNotification />
    </div>
  )
}
