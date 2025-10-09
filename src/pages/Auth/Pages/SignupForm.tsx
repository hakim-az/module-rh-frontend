import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/contexts/KeyCloakContext/useAuth'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { PasswordStrengthIndicator } from '../ui/PasswordStrengthIndicator'
import { CheckCircle, Eye, EyeOff } from 'lucide-react'
import { signupSchema, type SignupFormData } from '@/lib/validation'
import Logo from '@/assets/icons/logo-text.svg?react'
import { useNavigate } from 'react-router-dom'

export default function SignupForm() {
  const { signup } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [signupError, setSignupError] = useState<string>('')
  const [showPasswordStrength, setShowPasswordStrength] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const naviagte = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const password = watch('password', '')

  const handleSignupSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => {
      naviagte('/') // naviagate to email verification
      setShowSuccess(false)
    }, 3000)
  }

  const onSubmit = async (data: SignupFormData) => {
    setSignupError('')
    try {
      await signup({
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        telephonePersonnel: data.telephonePersonnel,
        email: data.email,
        password: data.password,
      })
      handleSignupSuccess()
    } catch (error) {
      setSignupError(error instanceof Error ? error.message : 'Signup failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md my-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {showSuccess ? (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Compte créé !
              </h2>
              <p className="text-gray-600 mb-4">
                Votre compte a été créé avec succès. Un{' '}
                <span className="font-semibold text-gray-900">
                  email de confirmation
                </span>{' '}
                vous a été envoyé. Veuillez confirmer votre adresse email pour
                activer votre compte et pouvoir vous connecter.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full animate-pulse"
                  style={{ width: '100%' }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Redirection vers la connexion...
              </p>
            </div>
          ) : (
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <Logo className="w-40 fill-transparent mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Créer un compte
                </h2>
                <p className="text-gray-600 mt-2">Rejoignez-nous aujourd'hui</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {signupError && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-red-600 text-sm">{signupError}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Prénom"
                    type="text"
                    placeholder="Jean"
                    error={errors.firstName?.message}
                    {...register('firstName')}
                  />
                  <Input
                    label="Nom de famille"
                    type="text"
                    placeholder="Dupont"
                    error={errors.lastName?.message}
                    {...register('lastName')}
                  />
                </div>

                <Input
                  label="Nom d'utilisateur"
                  type="text"
                  placeholder="jeandupont"
                  error={errors.username?.message}
                  {...register('username')}
                />

                <Input
                  label="Adresse email"
                  type="text"
                  placeholder="jean@exemple.com"
                  error={errors.email?.message}
                  {...register('email')}
                />

                <Input
                  label="Numéro de téléphone personnel"
                  type="number"
                  placeholder="07 77 77 77 77"
                  error={errors.telephonePersonnel?.message}
                  {...register('telephonePersonnel')}
                />

                <div className="relative">
                  <Input
                    label="Mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Créez un mot de passe"
                    error={errors.password?.message}
                    {...register('password')}
                    onFocus={() => setShowPasswordStrength(true)}
                    onBlur={() => setShowPasswordStrength(false)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  <PasswordStrengthIndicator
                    password={password}
                    show={showPasswordStrength || password.length > 0}
                  />
                </div>

                <div className="relative">
                  <Input
                    label="Confirmer le mot de passe"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirmez votre mot de passe"
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }>
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  isLoading={isSubmitting}>
                  Créer le compte
                </Button>

                <div className="text-center">
                  <p className="text-gray-600">
                    Vous avez déjà un compte ?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        naviagte('/')
                      }}
                      className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                      Se connecter
                    </button>
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
