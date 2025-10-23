/* eslint-disable react-dom/no-unsafe-iframe-sandbox */
import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'
import Select, { type MultiValue } from 'react-select'
import axios from 'axios'

interface SignatureModalProps {
  signatureUrl: string
  onClose: () => void
  onComplete: (status: 'completed' | 'cancelled' | 'error') => void
}

interface GroupOption {
  value: string
  label: string
}

export function IframeSignatureModal({
  signatureUrl,
  onClose,
  onComplete,
}: SignatureModalProps) {
  const { salarieDetails } = useSalarieDetailsContext()
  const navigate = useNavigate()

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false) // ✅ état du bouton
  const [selectedGroups, setSelectedGroups] = useState<GroupOption[]>([])

  const USERS_GROUP_ID = 'e4ac33c7-a458-4d0d-8102-9844aa04204d'
  const REALM = 'master'

  const GROUP_OPTIONS: GroupOption[] = [
    // salariés
    {
      value: '7d5af3a8-ffab-4b46-b608-ea7d90c1056b',
      label: 'Comptabilité',
    },
    {
      value: '96facf48-f97e-4b43-907b-16b7dbffebc4',
      label: 'Formation',
    },
    {
      value: '9e799fc2-ee4b-463b-b72f-222e7a2fdba9',
      label: 'Gestion',
    },
    {
      value: '74736260-b0c9-4002-96b7-fcaac4af7bbf',
      label: 'IT',
    },
    {
      value: '801ac0f7-fa6b-4ed8-a6fa-a5a416e6f851',
      label: 'Marketing / Communication',
    },
    {
      value: 'bd2b18c3-5335-4d1d-b9f7-7091f147b0b2',
      label: 'Ressources Humaines',
    },
    // prospection
    {
      value: '0f3c0500-aee8-4548-af3e-1109392cfc77',
      label: 'Prospection commercial',
    },
    {
      value: 'e7545c50-e304-4e07-b008-432340a53f23',
      label: 'Prospection gestionnaire',
    },
    {
      value: '2e970832-7f85-4b88-b991-0d1317350ffa',
      label: 'Prospection Manager',
    },
    {
      value: 'a1808de1-597f-43ef-9e35-de2073aabd78',
      label: 'Prospection Admin',
    },
    {
      value: 'a02931c8-9bfb-49ab-bd20-ed2416a0e8ea',
      label: 'Prospection Directeur',
    },
    // rh
    {
      value: 'd662844e-7cfc-44df-aec1-9db763b0f324',
      label: 'RH Assistant',
    },
    {
      value: 'bf1dde96-eb99-46b4-8920-27ccb67723c9',
      label: 'RH Manager',
    },
    // vente
    {
      value: '86e493f7-7a78-4e7d-ac1a-9bced2037da9',
      label: 'Vente Admin',
    },
    {
      value: 'ab894891-23fb-4cd5-bc48-a776b6611bf3',
      label: 'Vente Commercial',
    },
    {
      value: '65888698-c0fc-493a-8c80-93fb620eca66',
      label: 'Vente Manager',
    },
  ]

  // ✅ récupère le token
  const getAuthToken = () => {
    const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
    return authUser?.token
  }

  // ✅ fonction incluse directement ici
  const completeSignature = useCallback(async () => {
    if (isSubmitting) return // empêche plusieurs clics
    setIsSubmitting(true)

    const signatureRequestId =
      localStorage.getItem('signatureRequestId') || null
    const documentId = localStorage.getItem('documentId') || null

    if (!signatureRequestId || !documentId) {
      console.error('Missing signature request ID or document ID')
      onComplete('error')
      setIsSubmitting(false)
      return
    }

    const token = getAuthToken()

    // 🔹 Define endpoint by role/post
    let endpoint = '/signature-cdi-iframe' // default
    switch (salarieDetails?.contrat.typeContrat) {
      case 'commercial':
        endpoint = '/signature-cdi-iframe/commercial/complete-rh'
        break
      case 'cdi-wc':
        endpoint = '/signature-cdi-iframe/wc/complete-rh'
        break
      case 'teleconseiller':
        endpoint = '/signature-cdi-iframe/fr-teleconseiller/complete-rh'
        break
      case 'cdi-ft':
        endpoint = '/signature-cdi-iframe/fr/complete-rh'
        break
      case 'cdi-ap':
        endpoint = '/signature-cdi-iframe/ap/complete-rh'
        break
      case 'cdi-mt':
        endpoint = '/signature-cdi-iframe/mt/complete-rh'
        break
      default:
        endpoint = ''
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            idUser: salarieDetails?.id,
            idContrat: salarieDetails?.contrat.id,
            signatureRequestId,
            documentId,
          }),
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Completion error:', errorText)
        throw new Error('Failed to complete signature process')
      }

      const data = await response.json()
      console.log('Completion response:', data)

      // ✅ nettoyage du localStorage
      localStorage.removeItem('signatureRequestId')
      localStorage.removeItem('documentId')

      onComplete('completed')
    } catch (error) {
      console.error('Signature completion error:', error)
      onComplete('error')
    }
  }, [salarieDetails, onComplete, isSubmitting])

  // 1️⃣ Make sure ValidateEmployee is inside your component
  const ValidateEmployee = useCallback(async () => {
    // if (selectedGroups.length === 0) {
    //   // notify({
    //   //   message: 'Veuillez sélectionner au moins un groupe',
    //   //   type: 'error',
    //   // })
    //   // return
    // }

    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      params.append('grant_type', 'client_credentials')
      params.append('client_id', import.meta.env.VITE_KEYCLOAK_CLIENT_ID)
      params.append(
        'client_secret',
        import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET
      )

      const tokenResponse = await axios.post(
        `${import.meta.env.VITE_KEYCLOAK_BASE_URL}/realms/master/protocol/openid-connect/token`,
        params
      )
      const accessToken = tokenResponse.data.access_token

      // Remove "Users" group
      await axios.delete(
        `${import.meta.env.VITE_KEYCLOAK_BASE_URL}/admin/realms/${REALM}/users/${salarieDetails?.id}/groups/${USERS_GROUP_ID}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )

      // Add selected groups
      await Promise.all(
        selectedGroups.map((group) =>
          axios.put(
            `${import.meta.env.VITE_KEYCLOAK_BASE_URL}/admin/realms/${REALM}/users/${salarieDetails?.id}/groups/${group.value}`,
            null,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          )
        )
      )

      // Update user status in your DB
      const formData = new FormData()
      formData.append('statut', 'user-approuved')

      const token = getAuthToken()
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/users/${salarieDetails?.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      // notify({ message: 'Contrat envoyé avec succès', type: 'success' })
      setTimeout(() => {
        navigate(0)
        setIsSubmitting(false)
      }, 200)
    } catch (error) {
      console.error(error)
      // notify({ message: 'Echec', type: 'error' })
      setIsSubmitting(false)
    }
  }, [selectedGroups, salarieDetails, navigate])

  const handleSignatureAndValidation = async () => {
    setIsSubmitting(true)
    try {
      await completeSignature() // ✅ first complete the signature
      await ValidateEmployee() // ✅ then validate employee groups
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const validOrigins = [
        'https://yousign.com',
        'https://yousign.app',
        'https://webapp.yousign.com',
      ]
      const isValidOrigin = validOrigins.some((origin) =>
        event.origin.startsWith(origin)
      )

      if (!isValidOrigin) return

      const eventType = event.data?.type || event.data?.event || event.data

      if (
        eventType === 'signature.completed' ||
        eventType === 'signer.completed' ||
        eventType === 'done' ||
        event.data?.status === 'completed'
      ) {
        completeSignature()
      } else if (
        eventType === 'signature.error' ||
        eventType === 'error' ||
        event.data?.status === 'error'
      ) {
        onComplete('error')
      } else if (
        eventType === 'signature.cancelled' ||
        eventType === 'cancelled' ||
        eventType === 'close'
      ) {
        onComplete('cancelled')
      }
    }

    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [completeSignature, onComplete, signatureUrl])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full h-full max-w-7xl max-h-[90vh] m-4 bg-white rounded-lg shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Signature du contrat
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Type: {salarieDetails?.contrat.typeContrat.toUpperCase()}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Fermer">
            <X className="w-6 h-6" />
          </button>
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement du document...</p>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-hidden relative">
          <iframe
            ref={iframeRef}
            src={signatureUrl}
            className="w-full h-full border-0"
            onLoad={() => setIsLoading(false)}
            title="Signature électronique"
            allow="camera; microphone"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-popups-to-escape-sandbox"
          />
        </div>

        <div className="bg-white border-t gap-6 border-gray-200 flex flex-col items-center px-8 py-10 text-gray-700">
          <div className="flex justify-between items-start w-full">
            <p className="text-sm md:text-base font-medium max-w-xl">
              {/* 💡 Une fois que vous avez{' '}
              <span className="font-semibold text-blue-600">
                terminé de signer le document
              </span>{' '}
              dans la fenêtre Yousign, cliquez sur le bouton ci-dessous pour
              confirmer et finaliser la signature.
              <br /> */}
              <span className="text-red-500 font-semibold">
                ⚠️ Ne cliquez pas avant d'avoir terminé toutes les étapes de
                signature et de séléctionner un groupe.
              </span>
            </p>

            <div className="w-80">
              <Select
                isMulti
                options={GROUP_OPTIONS}
                value={selectedGroups}
                onChange={(newValue: MultiValue<GroupOption>) =>
                  setSelectedGroups([...newValue])
                }
                placeholder="Sélectionner des groupes..."
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignatureAndValidation}
            disabled={isSubmitting}
            className={`mt-4 md:mt-0 px-6 py-2 rounded-lg font-semibold text-white transition-all duration-200 shadow-sm ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#0066FF] hover:bg-[#0052CC] focus:ring-2 focus:ring-[#0066FF]/50'
            }`}>
            {isSubmitting
              ? 'Envoi en cours...'
              : '✅ J’ai terminé la signature'}
          </button>
        </div>
      </div>
    </div>
  )
}
