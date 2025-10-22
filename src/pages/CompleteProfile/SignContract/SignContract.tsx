import FileViewer from './components/FileViewer/FileViewer'
import { useState } from 'react'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { IframeSignatureModal } from './components/SignContractModal/IframeSignatureModal'

export default function SignContract() {
  // dashbaord context
  const { userDetails } = useDashboardContext()

  const [signatureUrl, setSignatureUrl] = useState<string | null>(null)
  const [signatureRequestId, setSignatureRequestId] = useState<string | null>(
    null
  )
  const [documentId, setDocumentId] = useState<string | null>(null)
  const [status, setStatus] = useState<
    | 'idle'
    | 'loading'
    | 'signing'
    | 'processing'
    | 'completed'
    | 'cancelled'
    | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  console.log(errorMessage)

  const getAuthToken = () => {
    const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
    return authUser?.token
  }

  const initiateSignature = async () => {
    setStatus('loading')
    setErrorMessage('')

    const token = getAuthToken()

    // 🔹 Define endpoint by role/post
    let endpoint = '/signature-cdi-iframe' // default
    switch (userDetails?.contrat.typeContrat) {
      case 'commercial':
        endpoint = '/signature-cdi-iframe/commercial/salarie'
        break
      case 'cdi-wc':
        endpoint = '/signature-cdi-iframe/wc/salarie'
        break
      case 'teleconseiller':
        endpoint = '/signature-cdi-iframe/fr-teleconseiller/salarie'
        break
      case 'cdi-ft':
        endpoint = '/signature-cdi-iframe/fr/salarie'
        break
      case 'cdi-ap':
        endpoint = '/signature-cdi-iframe/ap/salarie'
        break
      case 'cdi-mt':
        endpoint = '/signature-cdi-iframe/mt/salarie'
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
            firstName: userDetails?.prenom.trim(),
            lastName: userDetails?.nomDeNaissance.trim(),
            email: userDetails?.emailPersonnel,
            pdfUrl: userDetails?.contrat.fichierContratNonSignerPdf,
          }),
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Response error:', errorText)
        throw new Error('Failed to initiate signature')
      }

      const data = await response.json()
      console.log('Backend response:', data)

      if (!data.signatureUrl) {
        throw new Error('No signature URL received from server')
      }

      if (!data.signatureRequestId || !data.documentId) {
        throw new Error('Missing signature request ID or document ID')
      }

      setSignatureRequestId(data.signatureRequestId)
      setDocumentId(data.documentId)
      setSignatureUrl(data.signatureUrl)
      setStatus('signing')

      // Save to localStorage
      localStorage.setItem('signatureRequestId', data.signatureRequestId)
      localStorage.setItem('documentId', data.documentId)
    } catch (error) {
      console.error('Signature initiation error:', error)
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'initialisation de la signature"
      )
    }
  }

  const completeSignature = async () => {
    if (!signatureRequestId || !documentId) {
      console.error('Missing signature request ID or document ID')
      setStatus('error')
      setErrorMessage('Missing signature information')
      return
    }

    setStatus('processing')
    setErrorMessage('')

    const token = getAuthToken()

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/signature-cdi/mt/complete-signature`,
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

      setStatus('completed')
    } catch (error) {
      console.error('Signature completion error:', error)
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Erreur lors de la finalisation de la signature'
      )
    }
  }

  const handleSignatureResult = async (
    result: 'completed' | 'cancelled' | 'error'
  ) => {
    setSignatureUrl(null)

    if (result === 'completed') {
      await completeSignature()
    } else if (result === 'cancelled') {
      setStatus('cancelled')
      setErrorMessage("La signature a été annulée par l'utilisateur.")
    } else if (result === 'error') {
      setStatus('error')
      setErrorMessage('Une erreur est survenue pendant la signature.')
    }
  }

  const handleClose = () => {
    setSignatureUrl(null)
    setStatus('idle')
  }

  return (
    <>
      {userDetails?.statut === 'contract-uploaded' && (
        <>
          <FileViewer initiateSignature={initiateSignature} status={status} />
          {signatureUrl && status === 'signing' && (
            <IframeSignatureModal
              signatureUrl={signatureUrl}
              onClose={handleClose}
              onComplete={handleSignatureResult}
            />
          )}
        </>
      )}
    </>
  )
}
