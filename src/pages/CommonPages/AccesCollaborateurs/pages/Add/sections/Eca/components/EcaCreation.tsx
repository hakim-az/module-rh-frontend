import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Lock, Send, Eye, EyeOff } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { useNavigate } from 'react-router-dom'

interface FormData {
  password: string
  confirmPassword: string
}

interface EcaCreationProps {
  id: string
}

export default function EcaCreation({ id }: EcaCreationProps) {
  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    mode: 'onBlur',
  })

  const navigate = useNavigate()

  const password = watch('password')

  const onSubmit = async (data: FormData) => {
    setLoading(true)

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/acces/${id}`,
        {
          password: data.password,
          status: 'online',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      showToast('Mot de passe ajouter avec succès!', 'success')
      reset()

      setTimeout(() => {
        navigate(0)
        setLoading(false)
      }, 200)
    } catch (error) {
      console.log(error)

      showToast(`Échec de l'ajout du mot de passe`, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>

          <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
            Création ECA
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Définissez votre mot de passe d'accès
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password', {
                    required: 'Le mot de passe est requis',
                    minLength: {
                      value: 8,
                      message:
                        'Le mot de passe doit contenir au moins 8 caractères',
                    },
                    // pattern: {
                    //   value:
                    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    //   message:
                    //     'Le mot de passe doit contenir majuscules, minuscules, chiffres et caractères spéciaux',
                    // },
                  })}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-300 focus:ring-blue-500'
                  }`}
                  placeholder="Entrez votre mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-800 transition-colors">
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: 'Veuillez confirmer votre mot de passe',
                    validate: (value) =>
                      value === password ||
                      'Les mots de passe ne correspondent pas',
                  })}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-300 focus:ring-blue-500'
                  }`}
                  placeholder="Confirmez votre mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-800 transition-colors">
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || Object.keys(errors).length > 0}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Chargement...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Ajouter le mot de passe
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
