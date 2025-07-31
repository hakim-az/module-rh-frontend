'use client'

import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { notify } from '@/lib/ToastNotification'
import { useNavigate } from 'react-router-dom'

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
    <section className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-11/12 max-w-[400px] mx-auto my-20 p-10 border border-gray-300 rounded-md shadow flex flex-col gap-4">
        <h1 className="text-xl font-semibold text-center mb-4">Connexion</h1>

        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
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
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            {...register('password', {
              required: 'Mot de passe requis',
              minLength: { value: 6, message: 'Minimum 6 caractères' },
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-5 disabled:cursor-not-allowed disabled:opacity-50">
          {isSubmitting ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>
    </section>
  )
}
