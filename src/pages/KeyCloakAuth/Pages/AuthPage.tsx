import React, { useState } from 'react'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'
import { CheckCircle } from 'lucide-react'

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleToggleForm = () => {
    setIsLogin(!isLogin)
    setShowSuccess(false)
  }

  const handleSignupSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => {
      setIsLogin(true)
      setShowSuccess(false)
    }, 3000)
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
                Votre compte a été créé avec succès. Vous pouvez maintenant vous
                connecter.
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
            <>
              {isLogin ? (
                <LoginForm onToggleForm={handleToggleForm} />
              ) : (
                <SignupForm
                  onToggleForm={handleToggleForm}
                  onSignupSuccess={handleSignupSuccess}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
