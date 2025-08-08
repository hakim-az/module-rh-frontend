import { AuthProvider } from './contexts/KeyCloakContext/AuthContext'
import { useAuth } from './contexts/KeyCloakContext/useAuth'
import { AuthPage } from './pages/KeyCloakAuth/Pages/AuthPage'
import Dashboard from './pages/Dashboard/Dashboard'
import { ProtectedRoute } from './pages/KeyCloakAuth/ProtectedRoute'
import DashboardProvider from './contexts/DashboardContext/DashboardProvider'
import { Navigate, Route, Routes } from 'react-router-dom'

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
    </Routes>
  ) : (
    <AuthPage />
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
