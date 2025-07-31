import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRoutes from './pages/PrivateRoutes/PrivateRoutes'
import PublicRoutes from './pages/PublicRoutes/PublicRoutes'

import DashboardProvider from './contexts/DashboardContext/DashboardProvider'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import Login from './pages/Auth/Login/Login'
import SignUp from './pages/Auth/SignUp/SignUp'

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <LoadingSpinner />
        </div>
      }>
      <Routes>
        {/* Dashboard page */}
        <Route
          path="/accueil/*"
          element={
            <PrivateRoutes>
              <DashboardProvider>
                <Dashboard />
              </DashboardProvider>
            </PrivateRoutes>
          }
        />

        {/* Login page */}
        <Route
          path="/"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />

        {/* signup page */}
        <Route
          path="/signup"
          element={
            <PublicRoutes>
              <SignUp />
            </PublicRoutes>
          }
        />
      </Routes>
    </Suspense>
  )
}

export default App
