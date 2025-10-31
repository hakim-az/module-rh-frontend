import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'
import DisplayInput from '@/components/DisplayInput/DisplayInput'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import axios from 'axios'
import ToastNotification, { notify } from '@/lib/ToastNotification'
import { ExternalLink, Loader2, Send } from 'lucide-react'

export default function NeolianeDemande() {
  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  const { salarieDetails } = useSalarieDetailsContext()

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const professionalEmail = useMemo(() => {
    const prenom = salarieDetails?.prenom?.trim() || ''
    const nom = salarieDetails?.nomDeNaissance?.trim() || ''
    const initial = prenom ? `${prenom[0]}.` : ''
    return `${initial}${nom}@finanssor.fr`
  }, [salarieDetails?.prenom, salarieDetails?.nomDeNaissance])

  const sendAccountCreationRequestEca = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/acces`,
        {
          userId: salarieDetails?.id?.toString(),
          status: 'encours',
          productCode: 'Neoliane',
          email: professionalEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response)

      notify({
        message: 'Demande envoyée avec succès',
        type: 'success',
      })

      setTimeout(() => {
        navigate(0)
      }, 200)
    } catch (error) {
      console.error(error)

      notify({
        message: 'Échec de l’envoi de la demande',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Neoliane</h1>
          <p className="text-sm text-muted-foreground">
            Créez ou gérez l’accès Neoliane du salarié.
          </p>
        </div>

        <Button asChild variant="secondary" className="gap-2">
          <a
            href="https://www.monneoliane.fr/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ouvrir le portail Mon Neoliane dans un nouvel onglet">
            <ExternalLink className="h-4 w-4" />
            Ouvrir Mon Neoliane
          </a>
        </Button>
      </div>

      {/* Card */}
      <div className="mx-auto w-full max-w-2xl rounded-2xl border bg-card p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DisplayInput
            label={'Nom'}
            value={salarieDetails?.nomDeNaissance || ''}
          />
          <DisplayInput label={'Prénom'} value={salarieDetails?.prenom || ''} />
        </div>

        <div className="mt-4">
          <DisplayInput
            label={'Email Professionnel'}
            value={professionalEmail}
          />
        </div>

        <div className="mt-8 flex items-center justify-center">
          <Button
            onClick={sendAccountCreationRequestEca}
            disabled={isLoading}
            className="gap-2 px-6"
            aria-live="polite"
            aria-busy={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Chargement…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden="true" />
                Envoyer la demande à Neoliane
              </>
            )}
          </Button>
        </div>
      </div>

      <ToastNotification />
    </>
  )
}
