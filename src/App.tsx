import { Suspense, lazy } from 'react'
import { AuthProvider } from './contexts/KeyCloakContext/AuthProvider'
import { useAuth } from './contexts/KeyCloakContext/AuthContext'
import { Navigate, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import ToastNotification from '@/lib/ToastNotification'
import { ProtectedRoute } from './pages/Auth/ProtectedRoute'
import DashboardProvider from './contexts/DashboardContext/DashboardProvider'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'

// Lazy imports
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))
const LoginForm = lazy(() => import('./pages/Auth/Pages/LoginForm'))
const SignupForm = lazy(() => import('./pages/Auth/Pages/SignupForm'))
const EmailVerification = lazy(
  () => import('./pages/Auth/Pages/EmailVerification')
)

function AppContent() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <LoadingSpinner />
        </div>
      }>
      {user ? (
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
          <ToastNotification />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/inscription" element={<SignupForm />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </Suspense>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
