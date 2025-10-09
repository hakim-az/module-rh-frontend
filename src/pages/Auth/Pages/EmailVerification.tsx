import { useState, useEffect } from 'react'
import {
  CheckCircle,
  XCircle,
  Loader,
  AlertCircle,
  ArrowRight,
} from 'lucide-react'

interface VerificationState {
  status: 'loading' | 'success' | 'error' | 'expired' | 'invalid'
  message: string
}

export default function EmailVerification() {
  const [verificationState, setVerificationState] = useState<VerificationState>(
    {
      status: 'loading',
      message: 'Vérification de votre email en cours...',
    }
  )

  // Extract token from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if (token) {
      verifyEmail(token)
    } else {
      setVerificationState({
        status: 'invalid',
        message: "Aucun token de vérification trouvé dans l'URL",
      })
    }
  }, [])

  const verifyEmail = async (token: string) => {
    try {
      const backendUrl = import.meta.env.VITE_API_BASE_URL

      const response = await fetch(
        `${backendUrl}/api/email-verification/verify`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        setVerificationState({
          status: 'success',
          message: data.message || 'Email vérifié avec succès !',
        })
        // Redirect to home after 3 seconds
        setTimeout(() => {
          window.location.href = '/'
        }, 3000)
      } else {
        const errorData = await response.json().catch(() => ({}))

        if (errorData.error === 'EXPIRED_TOKEN') {
          setVerificationState({
            status: 'expired',
            message: errorData.message || 'Le lien de vérification a expiré',
          })
        } else if (errorData.error === 'INVALID_TOKEN') {
          setVerificationState({
            status: 'invalid',
            message: errorData.message || 'Token de vérification invalide',
          })
        } else {
          setVerificationState({
            status: 'error',
            message: errorData.message || "Échec de la vérification de l'email",
          })
        }
      }
    } catch (error) {
      console.error('Erreur de vérification:', error)
      setVerificationState({
        status: 'error',
        message:
          'Erreur de connexion. Vérifiez votre connexion internet et réessayez.',
      })
    }
  }

  const getStatusIcon = () => {
    switch (verificationState.status) {
      case 'loading':
        return <Loader className="w-16 h-16 text-blue-500 animate-spin" />
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-500" />
      case 'error':
      case 'expired':
      case 'invalid':
        return <XCircle className="w-16 h-16 text-red-500" />
      default:
        return <AlertCircle className="w-16 h-16 text-yellow-500" />
    }
  }

  const getStatusColor = () => {
    switch (verificationState.status) {
      case 'loading':
        return 'text-blue-600'
      case 'success':
        return 'text-green-600'
      case 'error':
      case 'expired':
      case 'invalid':
        return 'text-red-600'
      default:
        return 'text-yellow-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">{getStatusIcon()}</div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Vérification Email
          </h1>

          <p className={`text-lg font-medium mb-6 ${getStatusColor()}`}>
            {verificationState.message}
          </p>

          {verificationState.status === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <ArrowRight className="w-5 h-5" />
                <span className="text-sm font-medium">
                  Redirection vers l'accueil dans 3 secondes...
                </span>
              </div>
            </div>
          )}

          {verificationState.status === 'loading' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-700 text-sm">
                Veuillez patienter pendant que nous vérifions votre adresse
                email...
              </p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-100">
            <a
              href="/"
              className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-500 font-medium text-sm transition-colors duration-200">
              <span>← Retour à l'accueil</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
