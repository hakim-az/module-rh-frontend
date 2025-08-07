// import { Suspense, lazy } from 'react'
// import { Routes, Route } from 'react-router-dom'
// import PrivateRoutes from './pages/PrivateRoutes/PrivateRoutes'
// import PublicRoutes from './pages/PublicRoutes/PublicRoutes'

// import DashboardProvider from './contexts/DashboardContext/DashboardProvider'
// import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
// import Login from './pages/Auth/Login/Login'
// import SignUp from './pages/Auth/SignUp/SignUp'

// const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))

// function App() {
//   return (
//     <Suspense
//       fallback={
//         <div className="flex items-center justify-center w-screen h-screen">
//           <LoadingSpinner />
//         </div>
//       }>
//       <Routes>
//         {/* Dashboard page */}
//         <Route
//           path="/accueil/*"
//           element={
//             <PrivateRoutes>
//               <DashboardProvider>
//                 <Dashboard />
//               </DashboardProvider>
//             </PrivateRoutes>
//           }
//         />

//         {/* Login page */}
//         <Route
//           path="/"
//           element={
//             <PublicRoutes>
//               <Login />
//             </PublicRoutes>
//           }
//         />

//         {/* signup page */}
//         <Route
//           path="/enregistrer"
//           element={
//             <PublicRoutes>
//               <SignUp />
//             </PublicRoutes>
//           }
//         />
//       </Routes>
//     </Suspense>
//   )
// }

// export default App

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
