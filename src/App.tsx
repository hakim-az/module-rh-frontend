import { AuthProvider } from './contexts/KeyCloakContext/AuthProvider'
import { useAuth } from './contexts/KeyCloakContext/AuthContext'
import Dashboard from './pages/Dashboard/Dashboard'
import { ProtectedRoute } from './pages/Auth/ProtectedRoute'
import DashboardProvider from './contexts/DashboardContext/DashboardProvider'
import { Navigate, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import NotFound from './pages/NotFound/NotFound'
import ToastNotification from '@/lib/ToastNotification'
import LoginForm from './pages/Auth/Pages/LoginForm'
import SignupForm from './pages/Auth/Pages/SignupForm'
import EmailVerification from './pages/Auth/Pages/EmailVerification'

function AppContent() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return user ? (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Navigate to="/accueil" replace />} />
        <Route
          path="/accueil/*"
          element={
            <ProtectedRoute>
              <DashboardProvider>
                <Dashboard />
              </DashboardProvider>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* le container pour les toasts */}
      <ToastNotification />
    </>
  ) : (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/inscription" element={<SignupForm />} />
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
