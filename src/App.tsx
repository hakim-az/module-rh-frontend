import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRoutes from './pages/PrivateRoutes/PrivateRoutes'
import PublicRoutes from './pages/PublicRoutes/PublicRoutes'

import DashboardProvider from './contexts/DashboardContext/DashboardProvider'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'

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

        {/* Not found page */}
        <Route
          path="*"
          element={
            <PublicRoutes>
              <section className="w-screen h-screen flex items-center justify-center bg-blue-400 text-black text-5xl flex-col gap-20">
                <h1>Login</h1>
                <button
                  type="button"
                  className="bg-white px-6 py-3 text-base rounded-lg hover:bg-blue-100 transition"
                  onClick={() => {
                    localStorage.setItem('userRole', 'employee')
                    window.location.href = '/accueil' // rediriger manuellement après login
                  }}>
                  Se connecter
                </button>
              </section>
            </PublicRoutes>
          }
        />
      </Routes>
    </Suspense>
  )
}

export default App
