/* eslint-disable react-dom/no-unsafe-iframe-sandbox */
import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { useNavigate } from 'react-router-dom'

interface SignatureModalProps {
  signatureUrl: string
  onClose: () => void
  onComplete: (status: 'completed' | 'cancelled' | 'error') => void
}

export function IframeSignatureModal({
  signatureUrl,
  onClose,
  onComplete,
}: SignatureModalProps) {
  const { userDetails } = useDashboardContext()
  const navigate = useNavigate()

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false) // ✅ état du bouton

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
    switch (userDetails?.contrat.typeContrat) {
      case 'commercial':
        endpoint = '/signature-cdi-iframe/commercial/complete-salarie'
        break
      case 'cdi-wc':
        endpoint = '/signature-cdi-iframe/wc/complete-salarie'
        break
      case 'teleconseiller':
        endpoint = '/signature-cdi-iframe/fr-teleconseiller/complete-salarie'
        break
      case 'cdi-ft':
        endpoint = '/signature-cdi-iframe/fr/complete-salarie'
        break
      case 'cdi-ap':
        endpoint = '/signature-cdi-iframe/ap/complete-salarie'
        break
      case 'cdi-mt':
        endpoint = '/signature-cdi-iframe/mt/complete-salarie'
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
            idUser: userDetails?.id,
            idContrat: userDetails?.contrat.id,
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

      // ✅ reload la page
      navigate(0)
    } catch (error) {
      console.error('Signature completion error:', error)
      onComplete('error')
    } finally {
      setIsSubmitting(false) // reset bouton
    }
  }, [userDetails, onComplete, navigate, isSubmitting])

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
              Type: {userDetails?.contrat.typeContrat.toUpperCase()}
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

        <div className="bg-white border-t border-gray-200 flex flex-col md:flex-row items-center justify-between px-8 py-10 text-gray-700">
          <p className="text-sm md:text-base font-medium max-w-xl">
            💡 Une fois que vous avez{' '}
            <span className="font-semibold text-blue-600">
              terminé de signer le document
            </span>{' '}
            dans la fenêtre Yousign, cliquez sur le bouton ci-dessous pour
            confirmer et finaliser la signature.
            <br />
            <span className="text-red-500 font-semibold">
              ⚠️ Ne cliquez pas avant d'avoir terminé toutes les étapes de
              signature.
            </span>
          </p>

          <button
            type="button"
            onClick={completeSignature}
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
