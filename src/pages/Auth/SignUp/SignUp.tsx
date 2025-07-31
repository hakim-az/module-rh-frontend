'use client'

import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { notify } from '@/lib/ToastNotification'
import { useNavigate } from 'react-router-dom'

type FormData = {
  prenom: string
  nomDeNaissance: string
  emailPersonnel: string
  telephonePersonnel: string
  password: string
  confirmPassword: string
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const navigate = useNavigate()

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      return
    }

    try {
      const formData = new FormData()
      if (data) {
        formData.append('role', 'employee')
        formData.append('statut', 'user-registred')
        formData.append('avatar', 'test')
        formData.append('emailPersonnel', data.emailPersonnel)
        formData.append('nomDeNaissance', data.nomDeNaissance)
        formData.append('password', data.password)
        formData.append('prenom', data.prenom)
        formData.append('telephonePersonnel', data.telephonePersonnel)
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      console.log(response)

      notify({
        message: 'success',
        type: 'success',
      })

      setTimeout(() => {
        navigate('/')
      }, 200)
    } catch (error) {
      console.error(error)

      notify({
        message: 'Echec',
        type: 'error',
      })
    }
  }

  return (
    <section className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-11/12 max-w-[600px] mx-auto my-20 p-10 border border-gray-300 rounded-md shadow flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="prenom">Prénom</Label>
          <Input
            id="prenom"
            {...register('prenom', { required: 'Prénom is required' })}
          />
          {errors.prenom && (
            <p className="text-sm text-red-500">{errors.prenom.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="nomDeNaissance">Nom de naissance</Label>
          <Input
            id="nomDeNaissance"
            {...register('nomDeNaissance', { required: 'Nom is required' })}
          />
          {errors.nomDeNaissance && (
            <p className="text-sm text-red-500">
              {errors.nomDeNaissance.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="emailPersonnel">Email</Label>
          <Input
            id="emailPersonnel"
            type="email"
            {...register('emailPersonnel', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/, message: 'Invalid email format' },
            })}
          />
          {errors.emailPersonnel && (
            <p className="text-sm text-red-500">
              {errors.emailPersonnel.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="telephonePersonnel">Téléphone</Label>
          <Input
            id="telephonePersonnel"
            {...register('telephonePersonnel', {
              required: 'Téléphone is required',
              pattern: { value: /^[0-9]+$/, message: 'Only numbers allowed' },
            })}
          />
          {errors.telephonePersonnel && (
            <p className="text-sm text-red-500">
              {errors.telephonePersonnel.message}
            </p>
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

        <div className="flex flex-col gap-3">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              validate: (val) =>
                val === watch('password') ||
                'Les mots de passe ne correspondent pas',
            })}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-5 disabled:cursor-not-allowed disabled:opacity-50">
          {isSubmitting ? 'Loading...' : 'Sign Up'}
        </Button>
      </form>
    </section>
  )
}
