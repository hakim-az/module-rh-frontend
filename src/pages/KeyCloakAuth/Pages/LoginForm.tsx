import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/contexts/KeyCloakContext/useAuth'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Eye, EyeOff } from 'lucide-react'
import Logo from '@/assets/icons/logo-text.svg?react'
import { loginSchema, type LoginFormData } from '@/lib/validation'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState<string>('')

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoginError('')
    try {
      await login(data.username, data.password)
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md my-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Logo className="w-40 mx-auto mb-4 fill-transparent" />
              <h2 className="text-3xl font-bold text-gray-900">Bon retour</h2>
              <p className="text-gray-600 mt-2">
                Connectez-vous à votre compte
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-red-600 text-sm">{loginError}</p>
                </div>
              )}

              <Input
                label="Nom d'utilisateur"
                type="text"
                placeholder="Saisissez votre nom d'utilisateur"
                error={errors.username?.message}
                {...register('username')}
              />

              <div className="relative">
                <Input
                  label="Mot de passe"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Saisissez votre mot de passe"
                  error={errors.password?.message}
                  {...register('password')}
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
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isSubmitting}>
                Se connecter
              </Button>

              <div className="text-center">
                <p className="text-gray-600">
                  Vous n'avez pas de compte ?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/signup')
                    }}
                    className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                    S'inscrire
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
