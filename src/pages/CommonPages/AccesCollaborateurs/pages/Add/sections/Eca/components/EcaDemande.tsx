import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'
import DisplayInput from '@/components/DisplayInput/DisplayInput'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import ToastNotification, { notify } from '@/lib/ToastNotification'

export default function EcaDemande() {
  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  const { salarieDetails } = useSalarieDetailsContext()

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const sendAccountCreationRequestEca = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/acces`,
        {
          userId: salarieDetails?.id.toString(),
          status: 'encours',
          productCode: 'ECA',
          email: `${salarieDetails?.prenom[0]}.${salarieDetails?.nomDeNaissance}@finanssor.fr`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response)

      notify({
        message: 'Demander envoyer avec success',
        type: 'success',
      })

      setTimeout(() => {
        navigate(0)
        setIsLoading(false)
      }, 200)
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
    <>
      <div className="flex items-center justify-between">
        <span className="text-xl font-medium">Contenu de la section ECA</span>
        <a
          href="https://espaceclient.eca-assurances.com/espace-courtage/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-2 rounded-md bg-blue-500 text-white inline-block max-w-[200px] text-center">
          Ouvrir Mon ECA
        </a>
      </div>
      <div className="flex flex-col mx-auto gap-5 w-11/12 max-w-[600px] ">
        <DisplayInput
          label={'Nom'}
          value={salarieDetails?.nomDeNaissance || ''}
        />
        <DisplayInput label={'Prénom'} value={salarieDetails?.prenom || ''} />
        <DisplayInput
          label={'Email Professionnel'}
          value={`${salarieDetails?.prenom?.[0]}.${salarieDetails?.nomDeNaissance}@finanssor.fr`}
        />
        <Button
          onClick={sendAccountCreationRequestEca}
          disabled={!!isLoading}
          className="mt-12 bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-blue-400 px-6 mx-auto">
          {isLoading ? 'Chargement en cours...' : 'Demande envoyer a ECA'}
        </Button>
      </div>
      <ToastNotification />
    </>
  )
}
