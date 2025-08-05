import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { notify } from '@/lib/ToastNotification'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import AuthBg from '@/assets/images/auth-bg.png'
import { PasswordStrengthIndicator } from '@/components/PasswordStrengthIndicator/PasswordStrengthIndicator'

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

  // State pour afficher / cacher le mot de passe
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPasswordStrength, setShowPasswordStrength] = useState(false)

  const password = watch('password', '')

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
        message: 'Inscription réussie',
        type: 'success',
      })

      setTimeout(() => {
        navigate('/')
      }, 200)
    } catch (error) {
      console.error(error)

      notify({
        message: 'Échec de l’inscription',
        type: 'error',
      })
    }
  }

  return (
    <section
      className="flex items-center justify-end bg-cover bg-center"
      style={{
        backgroundImage: `url(${AuthBg})`,
        backgroundColor: '#00F',
      }}>
      {/* Form */}
      <div className="w-full bg-white lg:w-1/2 min-h-screen py-20 top-20 flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center p-7 lg:p-12 w-11/12 max-w-[650px] flex-wrap mx-auto bg-white gap-8 rounded-lg border border-gray-300 shadow-2xl">
          <span className="text-4xl font-bold mb-5">Logo</span>
          {/* nom / prénom */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8 w-full">
            <div className="flex flex-col">
              <Label htmlFor="prenom" className="mb-2.5">
                Prénom <span className="font-medium text-red-500">*</span>
              </Label>
              <Input
                id="prenom"
                {...register('prenom', { required: 'Le prénom est requis' })}
                placeholder="Prénom"
              />
              {errors.prenom && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.prenom.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <Label htmlFor="nomDeNaissance" className="mb-2.5">
                Nom <span className="font-medium text-red-500">*</span>
              </Label>
              <Input
                id="nomDeNaissance"
                {...register('nomDeNaissance', {
                  required: 'Le nom est requis',
                })}
                placeholder="Nom"
              />
              {errors.nomDeNaissance && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.nomDeNaissance.message}
                </p>
              )}
            </div>
          </div>

          {/* email */}
          <div className="flex flex-col w-full">
            <Label htmlFor="emailPersonnel" className="mb-2.5">
              Email <span className="font-medium text-red-500">*</span>
            </Label>
            <Input
              id="emailPersonnel"
              type="email"
              {...register('emailPersonnel', {
                required: `L'email est requis`,
                pattern: {
                  value: /^\S+@\S+$/,
                  message: 'Format de l’email invalide',
                },
              })}
              placeholder="Email"
            />
            {errors.emailPersonnel && (
              <p className="text-sm text-red-500 mt-2">
                {errors.emailPersonnel.message}
              </p>
            )}
          </div>

          {/* téléphone */}
          <div className="flex flex-col w-full">
            <Label htmlFor="telephonePersonnel" className="mb-2.5">
              Téléphone <span className="font-medium text-red-500">*</span>
            </Label>
            <Input
              id="telephonePersonnel"
              {...register('telephonePersonnel', {
                required: 'Le numéro de téléphone est requis',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Seulement des chiffres autorisés',
                },
              })}
              placeholder="07 77 77 77 77"
            />
            {errors.telephonePersonnel && (
              <p className="text-sm text-red-500 mt-2">
                {errors.telephonePersonnel.message}
              </p>
            )}
          </div>

          {/* mot de passe / confirmer mot de passe */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8 w-full">
            <div className="flex flex-col relative">
              <Label htmlFor="password" className="mb-2.5">
                Mot de passe <span className="font-medium text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Le mot de passe est requis',
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                    message:
                      'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial',
                  },
                })}
                onFocus={() => setShowPasswordStrength(true)}
                onBlur={() => setShowPasswordStrength(false)}
                placeholder="************"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-8 text-gray-500">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.password.message}
                </p>
              )}
              <PasswordStrengthIndicator
                password={password}
                show={showPasswordStrength || password.length > 0}
              />
            </div>

            <div className="flex flex-col relative">
              <Label htmlFor="confirmPassword" className="mb-2">
                Confirmer le mot de passe{' '}
                <span className="font-medium text-red-500">*</span>
              </Label>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  validate: (val) =>
                    val === watch('password') ||
                    'Les mots de passe ne correspondent pas',
                })}
                placeholder="************"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-8 text-gray-500">
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-base h-10 mt-4 disabled:cursor-not-allowed disabled:opacity-50">
            {isSubmitting ? 'Chargement...' : `Créer le compte`}
          </Button>

          <div className="text-center">
            <p className="text-gray-600">
              Vous avez déjà un compte ?{' '}
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                Se connecter
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
