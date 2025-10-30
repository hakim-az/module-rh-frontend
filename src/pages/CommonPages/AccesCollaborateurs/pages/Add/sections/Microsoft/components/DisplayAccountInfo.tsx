// import { useEffect, useRef, useState } from 'react'
// import axios from 'axios'
// import DisplayInput from '@/components/DisplayInput/DisplayInput'
// import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Eye, EyeOff, Trash, Copy, Loader2 } from 'lucide-react'

// export default function DisplayAccountInfo() {
//   const { salarieDetails } = useSalarieDetailsContext()

//   // modal / form states
//   const [isResetModalOpen, setIsResetModalOpen] = useState(false)
//   const [newPassword, setNewPassword] = useState('')
//   const [loading, setLoading] = useState(false) // generic action loader

//   // view password states
//   const [showPassword, setShowPassword] = useState(false)
//   const [realPassword, setRealPassword] = useState<string | null>(null)
//   const [loadingPassword, setLoadingPassword] = useState(false)
//   const [secondsLeft, setSecondsLeft] = useState(0)
//   const countdownRef = useRef<number | null>(null)

//   // copy feedback & messages
//   const [copySuccess, setCopySuccess] = useState<string | null>(null)
//   const [message, setMessage] = useState<{
//     type: 'success' | 'error'
//     text: string
//   } | null>(null)

//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

//   const userId = salarieDetails?.userEmails?.[0]?.userId

//   // helper to show a temporary message (replaces alert)
//   const showTempMessage = (
//     type: 'success' | 'error',
//     text: string,
//     ms = 3500
//   ) => {
//     setMessage({ type, text })
//     window.setTimeout(() => setMessage(null), ms)
//   }

//   // Fetch & show decrypted password for 30s
//   const handleViewPassword = async () => {
//     if (!userId) {
//       showTempMessage('error', 'Utilisateur introuvable.')
//       return
//     }
//     if (showPassword) return // already showing
//     try {
//       setLoadingPassword(true)

//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/user-emails/user/${userId}`
//       )
//       // Expect { password: "..." } from server
//       const fetched = res.data?.password
//       if (!fetched) {
//         throw new Error('Aucun mot de passe renvoyé')
//       }

//       setRealPassword(fetched)
//       setShowPassword(true)
//       setSecondsLeft(30)

//       // start countdown (store id so we can clear)
//       // using window.setInterval returns a number
//       countdownRef.current = window.setInterval(() => {
//         setSecondsLeft((prev) => {
//           if (prev <= 1) {
//             // stop and clear sensitive data
//             if (countdownRef.current) {
//               clearInterval(countdownRef.current)
//               countdownRef.current = null
//             }
//             setShowPassword(false)
//             setRealPassword(null)
//             return 0
//           }
//           return prev - 1
//         })
//       }, 1000)
//     } catch (err) {
//       console.error(err)
//       showTempMessage('error', 'Impossible de récupérer le mot de passe.')
//     } finally {
//       setLoadingPassword(false)
//     }
//   }

//   // copy the decrypted password to clipboard, show lightweight feedback
//   const handleCopyPassword = async () => {
//     if (!realPassword) return
//     try {
//       await navigator.clipboard.writeText(realPassword)
//       setCopySuccess('Copié')
//       setTimeout(() => setCopySuccess(null), 2000)
//     } catch (err) {
//       console.error(err)
//       showTempMessage('error', 'Échec de la copie')
//     }
//   }

//   // reset (update) password
//   const handleResetPassword = async () => {
//     if (!userId) {
//       showTempMessage('error', 'Utilisateur introuvable.')
//       return
//     }
//     if (!newPassword) {
//       showTempMessage('error', 'Entrez un nouveau mot de passe.')
//       return
//     }

//     try {
//       setLoading(true)
//       await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/user-emails/reset-password`,
//         {
//           userId,
//           newPassword: newPassword,
//         }
//       )
//       showTempMessage('success', 'Mot de passe mis à jour ✅')
//       setNewPassword('')
//       setIsResetModalOpen(false)
//     } catch (err) {
//       console.error(err)
//       showTempMessage('error', 'Erreur lors de la mise à jour du mot de passe.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // delete email account
//   const handleDeleteAccount = async () => {
//     if (!userId) {
//       showTempMessage('error', 'Utilisateur introuvable.')
//       return
//     }

//     try {
//       setLoading(true)
//       await axios.delete(
//         `${import.meta.env.VITE_API_BASE_URL}/user-emails/${userId}`
//       )
//       showTempMessage('success', 'Compte supprimé ✅')
//       setIsDeleteModalOpen(false)

//       // Optionally refresh context or redirect
//       // refreshData()
//     } catch (err) {
//       console.error(err)
//       showTempMessage('error', 'Erreur lors de la suppression.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Cleanup interval on unmount
//   useEffect(() => {
//     return () => {
//       if (countdownRef.current) {
//         clearInterval(countdownRef.current)
//       }
//     }
//   }, [])

//   return (
//     <div className="flex flex-col gap-5 w-full bg-white p-8 rounded-md border border-gray-300 shadow-sm">
//       <div className="flex items-start justify-between gap-4">
//         <h3 className="text-lg font-medium">
//           Informations du compte Office 365
//         </h3>

//         {/* inline message area */}
//         {message && (
//           <div
//             className={`px-3 py-1 rounded-md text-sm ${
//               message.type === 'success'
//                 ? 'bg-green-100 text-green-800'
//                 : 'bg-red-100 text-red-800'
//             }`}>
//             {message.text}
//           </div>
//         )}
//       </div>

//       <DisplayInput
//         label="Nom complet"
//         value={salarieDetails?.userEmails?.[0]?.displayName || ''}
//       />

//       <DisplayInput
//         label="Email Professionnel"
//         value={salarieDetails?.userEmails?.[0]?.upn || ''}
//       />

//       {/* Password section */}
//       <div className="flex flex-col gap-2">
//         <div className="flex items-center justify-between">
//           <span className="font-medium">Mot de passe</span>

//           <div className="flex items-center gap-2">
//             {/* Delete button */}
//             <Button
//               variant="destructive"
//               size="sm"
//               onClick={() => setIsDeleteModalOpen(true)}
//               disabled={loading}
//               className="flex items-center gap-2">
//               {loading ? (
//                 <Loader2 className="animate-spin h-4 w-4" />
//               ) : (
//                 <Trash size={14} />
//               )}
//               <span className="text-sm">Supprimer</span>
//             </Button>
//           </div>
//         </div>

//         {/* Delete Account Modal */}
//         {isDeleteModalOpen && (
//           <div
//             role="dialog"
//             aria-modal="true"
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//             <div className="bg-white rounded-md shadow-lg w-[500px] max-w-full p-6">
//               <h4 className="text-lg font-semibold text-red-600">
//                 Supprimer le compte ?
//               </h4>

//               <p className="text-sm text-gray-700 mt-2 leading-relaxed">
//                 Vous êtes sur le point de{' '}
//                 <span className="font-semibold text-red-600">
//                   supprimer définitivement{' '}
//                 </span>
//                 le compte email professionnel :
//                 <br />
//                 <span className="font-mono text-sm text-black">
//                   {salarieDetails?.userEmails?.[0]?.upn}
//                 </span>
//                 <br />
//                 <br />
//                 Cette action est <b>irréversible</b>.
//               </p>

//               <div className="mt-5 flex items-center justify-end gap-2">
//                 <Button
//                   variant="outline"
//                   onClick={() => setIsDeleteModalOpen(false)}
//                   disabled={loading}>
//                   Annuler
//                 </Button>

//                 <Button
//                   variant="destructive"
//                   onClick={handleDeleteAccount}
//                   disabled={loading}
//                   className="flex items-center gap-2">
//                   {loading ? (
//                     <Loader2 className="animate-spin h-4 w-4" />
//                   ) : (
//                     <Trash size={16} />
//                   )}
//                   Supprimer
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="flex items-center gap-3">
//           <div className="flex-1 bg-gray-50 border border-gray-200 px-3 py-2 rounded-md">
//             <div className="flex items-center justify-between">
//               <div className="truncate text-sm tracking-widest">
//                 {loadingPassword ? (
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <Loader2 className="animate-spin h-4 w-4" />
//                     Chargement...
//                   </div>
//                 ) : showPassword ? (
//                   <span className="font-mono text-sm">{realPassword}</span>
//                 ) : (
//                   <span className="text-sm">************</span>
//                 )}
//               </div>

//               <div className="flex items-center gap-2 ml-4">
//                 {/* view / countdown */}
//                 {!showPassword ? (
//                   <button
//                     type="button"
//                     onClick={handleViewPassword}
//                     disabled={loadingPassword || !!secondsLeft}
//                     aria-label="Voir le mot de passe"
//                     className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
//                     title="Afficher le mot de passe (30s)">
//                     {loadingPassword ? (
//                       <Loader2 className="animate-spin h-4 w-4" />
//                     ) : (
//                       <Eye size={16} />
//                     )}
//                   </button>
//                 ) : (
//                   <div className="flex items-center gap-2 px-2">
//                     <span className="text-xs text-gray-500 w-12 text-center">
//                       {secondsLeft}s
//                     </span>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         // manual hide
//                         if (countdownRef.current) {
//                           clearInterval(countdownRef.current)
//                           countdownRef.current = null
//                         }
//                         setShowPassword(false)
//                         setRealPassword(null)
//                         setSecondsLeft(0)
//                       }}
//                       title="Masquer"
//                       className="p-1 rounded hover:bg-gray-100">
//                       <EyeOff size={16} />
//                     </button>
//                   </div>
//                 )}

//                 {/* copy button */}
//                 <button
//                   type="button"
//                   onClick={handleCopyPassword}
//                   disabled={!showPassword}
//                   title={copySuccess ?? 'Copier'}
//                   className={`p-1 rounded hover:bg-gray-100 disabled:opacity-50`}>
//                   <div className="flex items-center gap-1">
//                     <Copy size={16} />
//                     {copySuccess ? (
//                       <span className="text-xs text-green-600">
//                         {copySuccess}
//                       </span>
//                     ) : null}
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Update password button */}
//         <div className="pt-2">
//           <Button
//             variant="outline"
//             onClick={() => setIsResetModalOpen(true)}
//             className="w-fit">
//             Mettre à jour le mot de passe
//           </Button>
//         </div>
//       </div>

//       {/* Reset Password Modal (simple) */}
//       {isResetModalOpen && (
//         <div
//           role="dialog"
//           aria-modal="true"
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//           <div className="bg-white rounded-md shadow-lg w-[420px] max-w-full p-6">
//             <h4 className="text-lg font-semibold">
//               Réinitialiser le mot de passe
//             </h4>
//             <p className="text-sm text-gray-600 mt-1">
//               Définissez un nouveau mot de passe pour{' '}
//               {salarieDetails?.userEmails?.[0]?.upn}.
//             </p>

//             <div className="mt-4">
//               <Input
//                 type="text"
//                 value={newPassword}
//                 placeholder="Nouveau mot de passe"
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//             </div>

//             <div className="mt-4 flex items-center justify-end gap-2">
//               <Button
//                 variant="outline"
//                 onClick={() => setIsResetModalOpen(false)}>
//                 Annuler
//               </Button>
//               <Button
//                 onClick={handleResetPassword}
//                 disabled={loading || !newPassword}>
//                 {loading ? (
//                   <Loader2 className="animate-spin h-4 w-4" />
//                 ) : (
//                   'Valider'
//                 )}
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
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
import { usePasswordVisibility } from '@/hooks/usePasswordVisibolity'
import { useToast } from '@/hooks/useToast'

export default function DisplayAccountInfo() {
  const { salarieDetails } = useSalarieDetailsContext()
  const { showToast } = useToast()

  const [isResetModalOpen, setIsResetModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const userId = salarieDetails?.userEmails?.[0]?.userId
  const userEmail = salarieDetails?.userEmails?.[0]?.upn
  const displayName = salarieDetails?.userEmails?.[0]?.displayName

  const {
    isVisible: showPassword,
    password: realPassword,
    isLoading: loadingPassword,
    secondsLeft,
    progress,
    show: handleViewPassword,
    hide: handleHidePassword,
  } = usePasswordVisibility({
    userId,
    duration: 30,
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
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user-emails/reset-password`,
        { userId, newPassword }
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
        `${import.meta.env.VITE_API_BASE_URL}/user-emails/${userId}`
      )
      showToast('Compte supprimé avec succès', 'success')
      setIsDeleteModalOpen(false)
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
            <h3 className="text-xl font-semibold text-gray-900">
              Compte Office 365
            </h3>
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
          <DisplayInput label="Nom complet" value={displayName || ''} />

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
