import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRoutes from './pages/PrivateRoutes/PrivateRoutes'
import PublicRoutes from './pages/PublicRoutes/PublicRoutes'

import DashboardProvider from './contexts/DashboardContext/DashboardProvider'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import { Button } from './components/ui/button'
import { User } from 'lucide-react'

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
              <section className="w-screen h-screen flex items-center justify-center bg-white text-black text-5xl flex-col gap-20">
                <h1>Module rh</h1>
                <div className="flex items-center justify-center gap-14 flex-wrap">
                  {/* salarié */}
                  <div className="border rounded shadow border-gray-300 flex items-center justify-center flex-col p-10 min-w-[300px] gap-8">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <User size={120} />
                      <span className="text-xl">Salarié</span>
                    </div>
                    <Button
                      size={'lg'}
                      onClick={() => {
                        localStorage.setItem('userRole', 'employee')
                        window.location.href = '/accueil'
                      }}>
                      Se connecter
                    </Button>
                  </div>
                  {/* RH */}
                  <div className="border rounded shadow border-gray-300 flex items-center justify-center flex-col p-10 min-w-[300px] gap-8">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <User size={120} />
                      <span className="text-xl">RH</span>
                    </div>
                    <Button
                      size={'lg'}
                      onClick={() => {
                        localStorage.setItem('userRole', 'hr')
                        window.location.href = '/accueil'
                      }}>
                      Se connecter
                    </Button>
                  </div>
                  {/* Admin */}
                  <div className="border rounded shadow border-gray-300 flex items-center justify-center flex-col p-10 min-w-[300px] gap-8">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <User size={120} />
                      <span className="text-xl">Admin</span>
                    </div>
                    <Button
                      size={'lg'}
                      onClick={() => {
                        localStorage.setItem('userRole', 'admin')
                        window.location.href = '/accueil'
                      }}>
                      Se connecter
                    </Button>
                  </div>
                </div>
              </section>
            </PublicRoutes>
          }
        />
      </Routes>
    </Suspense>
  )
}

export default App
