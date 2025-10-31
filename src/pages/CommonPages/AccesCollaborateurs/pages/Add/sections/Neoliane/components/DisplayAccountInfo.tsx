// }

import { useEffect, useRef, useState, useCallback } from 'react'
import axios from 'axios'
import DisplayInput from '@/components/DisplayInput/DisplayInput'
import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Eye,
  EyeOff,
  Trash,
  Copy,
  Loader2,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
} from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { usePasswordVisibilityWinlead } from '@/hooks/usePasswordVisibilityWinlead'
import { useNavigate } from 'react-router-dom'

export default function DisplayAccountInfo() {
  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  const { salarieDetails } = useSalarieDetailsContext()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [isResetModalOpen, setIsResetModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const EcaAccess = salarieDetails?.acces?.find(
    (access) => access.productCode === 'Neoliane'
  )

  const userId = EcaAccess?.userId
  const userEmail = EcaAccess?.email

  const {
    isVisible: showPassword,
    password: realPassword,
    isLoading: loadingPassword,
    secondsLeft,
    progress,
    show: handleViewPassword,
    hide: handleHidePassword,
  } = usePasswordVisibilityWinlead({
    userId,
    duration: 30,
    productCode: 'Neoliane',
    onError: (error) => showToast(error, 'error'),
  })

  const handleCopyPassword = useCallback(async () => {
    if (!realPassword) return
    try {
      await navigator.clipboard.writeText(realPassword)
      setCopySuccess(true)
      showToast('Mot de passe copié', 'success')
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error(err)
      showToast('Échec de la copie', 'error')
    }
  }, [realPassword, showToast])

  const handleResetPassword = async () => {
    if (!userId) {
      showToast('Utilisateur introuvable', 'error')
      return
    }
    if (!newPassword || newPassword.length < 8) {
      showToast('Le mot de passe doit contenir au moins 8 caractères', 'error')
      return
    }

    try {
      setLoading(true)
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/acces/${EcaAccess.id}/reset-password`,
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      showToast('Mot de passe mis à jour avec succès', 'success')
      setNewPassword('')
      setIsResetModalOpen(false)
    } catch (err) {
      console.error(err)
      showToast('Erreur lors de la mise à jour du mot de passe', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!userId) {
      showToast('Utilisateur introuvable', 'error')
      return
    }

    try {
      setLoading(true)
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/acces/${EcaAccess.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      showToast('Compte supprimé avec succès', 'success')

      setTimeout(() => {
        navigate(0)
        setIsDeleteModalOpen(false)
      }, 200)
    } catch (err) {
      console.error(err)
      showToast('Erreur lors de la suppression du compte', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleModalClose = (modalSetter: (value: boolean) => void) => {
    if (!loading) {
      modalSetter(false)
      setNewPassword('')
    }
  }

  return (
    <>
      <div className="flex flex-col gap-6 w-full bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Compte ECA</h3>
            <p className="text-sm text-gray-500 mt-1">
              Gérez les informations et la sécurité du compte
            </p>
          </div>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={loading}
            className="flex items-center gap-2 transition-all hover:scale-105">
            <Trash size={16} />
            <span>Supprimer</span>
          </Button>
        </div>

        <div className="space-y-5">
          <DisplayInput
            label="Nom complet"
            value={`${salarieDetails?.nomDeNaissance} ${salarieDetails?.prenom}`}
          />

          <DisplayInput label="Email professionnel" value={userEmail || ''} />

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Mot de passe
              </span>
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg transition-all hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <div className="truncate font-mono text-sm">
                    {loadingPassword ? (
                      <div className="flex items-center gap-2 text-gray-500">
                        <Loader2 className="animate-spin h-4 w-4" />
                        <span>Récupération sécurisée...</span>
                      </div>
                    ) : showPassword ? (
                      <span className="text-gray-900">{realPassword}</span>
                    ) : (
                      <span className="text-gray-400 tracking-wider">
                        ••••••••••••
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {showPassword ? (
                      <>
                        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-md">
                          <div className="relative w-8 h-8">
                            <svg className="transform -rotate-90 w-8 h-8">
                              <circle
                                cx="16"
                                cy="16"
                                r="14"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                className="text-gray-200"
                              />
                              <circle
                                cx="16"
                                cy="16"
                                r="14"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray={87.96}
                                strokeDashoffset={87.96 * (1 - progress)}
                                className="text-blue-500 transition-all duration-1000 linear"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-medium text-blue-600">
                                {secondsLeft}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleHidePassword}
                          className="p-2 hover:bg-gray-200 transition-colors">
                          <EyeOff size={18} />
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleViewPassword}
                        disabled={loadingPassword}
                        className="p-2 hover:bg-gray-200 transition-colors">
                        <Eye size={18} />
                      </Button>
                    )}

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyPassword}
                      disabled={!showPassword}
                      className="p-2 hover:bg-gray-200 transition-colors disabled:opacity-40">
                      {copySuccess ? (
                        <CheckCircle2 size={18} className="text-green-600" />
                      ) : (
                        <Copy size={18} />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setIsResetModalOpen(true)}
              className="w-fit flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <RefreshCw size={16} />
              Mettre à jour le mot de passe
            </Button>
          </div>
        </div>
      </div>

      {isResetModalOpen && (
        <Modal
          isOpen={isResetModalOpen}
          onClose={() => handleModalClose(setIsResetModalOpen)}
          title="Réinitialiser le mot de passe"
          loading={loading}>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-3">
              <AlertCircle
                size={20}
                className="text-blue-600 flex-shrink-0 mt-0.5"
              />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Compte : {userEmail}</p>
                <p className="text-xs mt-1 text-blue-600">
                  Le mot de passe doit contenir au moins 8 caractères
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nouveau mot de passe
              </label>
              <Input
                type="text"
                value={newPassword}
                placeholder="Entrez le nouveau mot de passe"
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newPassword.length >= 8) {
                    handleResetPassword()
                  }
                }}
                autoFocus
                className="w-full"
              />
              {newPassword && newPassword.length < 8 && (
                <p className="text-xs text-red-500 mt-1">
                  Minimum 8 caractères requis
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => handleModalClose(setIsResetModalOpen)}
                disabled={loading}>
                Annuler
              </Button>
              <Button
                onClick={handleResetPassword}
                disabled={loading || !newPassword || newPassword.length < 8}
                className="flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" />
                    <span>Mise à jour...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Valider</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => handleModalClose(setIsDeleteModalOpen)}
          title="Supprimer le compte"
          loading={loading}
          danger>
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
              <AlertCircle size={24} className="text-red-600 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-red-900 mb-2">
                  Action irréversible
                </p>
                <p className="text-red-800 leading-relaxed">
                  Vous êtes sur le point de supprimer définitivement le compte :
                </p>
                <p className="font-mono text-sm mt-2 bg-red-100 px-3 py-2 rounded text-red-900 break-all">
                  {userEmail}
                </p>
                <p className="text-red-800 mt-3 font-medium">
                  Cette action ne peut pas être annulée.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => handleModalClose(setIsDeleteModalOpen)}
                disabled={loading}>
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={loading}
                className="flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" />
                    <span>Suppression...</span>
                  </>
                ) : (
                  <>
                    <Trash size={16} />
                    <span>Supprimer définitivement</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  loading?: boolean
  danger?: boolean
}

function Modal({
  isOpen,
  onClose,
  title,
  children,
  loading,
  danger,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, loading, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose()
        }
      }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title">
        <div
          className={`border-b px-6 py-4 ${danger ? 'border-red-100' : 'border-gray-200'}`}>
          <h3
            id="modal-title"
            className={`text-lg font-semibold ${danger ? 'text-red-600' : 'text-gray-900'}`}>
            {title}
          </h3>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  )
}
