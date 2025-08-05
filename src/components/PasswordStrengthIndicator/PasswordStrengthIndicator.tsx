import React from 'react'
import { Check, X } from 'lucide-react'

interface PasswordStrengthIndicatorProps {
  password: string
  show: boolean
}

interface PasswordRequirement {
  label: string
  test: (password: string) => boolean
}

const requirements: PasswordRequirement[] = [
  {
    label: 'Au moins 8 caractères',
    test: (password) => password.length >= 8,
  },
  {
    label: 'Une lettre majuscule',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: 'Une lettre minuscule',
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: 'Un chiffre',
    test: (password) => /\d/.test(password),
  },
  {
    label: 'Un caractère spécial',
    test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
]

export const PasswordStrengthIndicator: React.FC<
  PasswordStrengthIndicatorProps
> = ({ password, show }) => {
  if (!show) return null

  const metRequirements = requirements.filter((req) =>
    req.test(password)
  ).length
  const strength = (metRequirements / requirements.length) * 100

  const getStrengthColor = () => {
    if (strength < 40) return 'bg-red-500'
    if (strength < 80) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthText = () => {
    if (strength < 40) return 'Faible'
    if (strength < 80) return 'Moyen'
    return 'Fort'
  }

  return (
    <div className="w-full mt-3 p-3 bg-gray-50 rounded-lg border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Force du mot de passe
        </span>
        <span
          className={`text-sm font-medium ${
            strength < 40
              ? 'text-red-600'
              : strength < 80
                ? 'text-yellow-600'
                : 'text-green-600'
          }`}>
          {getStrengthText()}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: `${strength}%` }}
        />
      </div>

      <div className="space-y-1">
        {requirements.map((requirement) => {
          const isMet = requirement.test(password)
          return (
            <div
              key={requirement.label}
              className="flex items-center space-x-2">
              {isMet ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-gray-400" />
              )}
              <span
                className={`text-sm ${
                  isMet ? 'text-green-700' : 'text-gray-500'
                }`}>
                {requirement.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
