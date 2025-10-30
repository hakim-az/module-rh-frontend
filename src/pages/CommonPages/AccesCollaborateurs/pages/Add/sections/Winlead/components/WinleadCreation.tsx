import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'
import DisplayInput from '@/components/DisplayInput/DisplayInput'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import ToastNotification, { notify } from '@/lib/ToastNotification'

export default function WinleadCreation() {
  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  const { salarieDetails } = useSalarieDetailsContext()

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const createMicrosoftAccount = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()

      if (salarieDetails) {
        formData.append('firstName', salarieDetails.prenom)
        formData.append('lastName', salarieDetails.nomDeNaissance)
        formData.append(
          'email',
          `${salarieDetails?.prenom[0]}.${salarieDetails?.nomDeNaissance}@finanssor.fr`
        )
        formData.append('phone', salarieDetails.telephonePersonnel)
        formData.append(
          'login',
          `${salarieDetails.nomDeNaissance.trim()}.${salarieDetails.prenom.trim()}`
        )
        formData.append(
          'signature',
          `${salarieDetails.nomDeNaissance.trim()[0]}.${salarieDetails.prenom.trim()[0]}`
        )
        formData.append('role', 'Conseiller')
        formData.append('userId', salarieDetails.id.toString())
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/acces/create-account-winlead`,
        {
          firstName: salarieDetails?.prenom,
          lastName: salarieDetails?.nomDeNaissance,
          email: `${salarieDetails?.prenom[0]}.${salarieDetails?.nomDeNaissance}@finanssor.fr`,
          phone: salarieDetails?.telephonePersonnel,
          login: `${salarieDetails?.nomDeNaissance.trim()}.${salarieDetails?.prenom.trim()}`,
          signature: `${salarieDetails?.nomDeNaissance.trim()[0]}.${salarieDetails?.prenom.trim()[0]}`,
          role: 'Conseiller',
          userId: salarieDetails?.id.toString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response)

      notify({
        message: 'Compte créer avec success',
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
        <DisplayInput
          label={'login'}
          value={`${salarieDetails?.nomDeNaissance.trim()}.${salarieDetails?.prenom.trim()}`}
        />
        <Button
          onClick={createMicrosoftAccount}
          disabled={!!isLoading}
          className="mt-12 bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-blue-400 px-6 mx-auto">
          {isLoading ? 'Création en cours...' : 'Créer le compte Winlead'}
        </Button>
      </div>
      <ToastNotification />
    </>
  )
}
