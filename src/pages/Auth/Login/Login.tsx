import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import ToastNotification, { notify } from '@/lib/ToastNotification'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import AuthBg from '@/assets/images/auth-bg.png'

type LoginForm = {
  email: string
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>()

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          email: data.email,
          password: data.password,
        }
      )

      const { access_token, user } = response.data

      localStorage.setItem('token', access_token)
      localStorage.setItem('userId', user.id)
      localStorage.setItem('userRole', user.role)

      notify({
        message: 'Connexion réussie',
        type: 'success',
      })

      setTimeout(() => {
        navigate('/accueil')
      }, 300)
    } catch (error) {
      console.error(error)

      notify({
        message: 'Échec de la connexion',
        type: 'error',
      })
    }
  }

  return (
    <section
      className="flex items-center h-screen min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${AuthBg})`,
      }}>
      {/* Form */}
      <div className="w-full lg:w-1/2 bg-white h-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center px-12 py-16 w-11/12 max-w-[600px] mx-auto bg-white gap-8 rounded-lg border border-gray-300 shadow-2xl">
          <span className="text-4xl font-bold mb-5">Logo</span>
          {/* Email */}
          <div className="flex flex-col w-full">
            <Label htmlFor="email" className="mb-3">
              Email <span className="font-medium text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email requis',
                pattern: {
                  value: /^\S+@\S+$/,
                  message: 'Format email invalide',
                },
              })}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-3">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Password */}
          <div className="flex flex-col relative w-full">
            <Label htmlFor="password" className="mb-3">
              Mot de passe <span className="font-medium text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'Mot de passe requis',
              })}
              placeholder="************"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-sm text-red-500 mt-3">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Submit button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-base h-10 mt-5 disabled:cursor-not-allowed disabled:opacity-50">
            {isSubmitting ? 'Connexion...' : 'Se connecter'}
          </Button>
          {/* navigation to signup */}
          <div className="text-center">
            <p className="text-gray-600">
              Vous n'avez pas de compte ?{' '}
              <button
                type="button"
                onClick={() => navigate('/enregistrer')}
                className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                S'inscrire
              </button>
            </p>
          </div>
        </form>
      </div>

      <ToastNotification />
    </section>
  )
}
