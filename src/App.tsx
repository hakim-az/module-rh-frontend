import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import PublicRoutes from './pages/PublicRoutes/PublicRoutes'
import PrivateRoutes from './pages/PrivateRoutes/PrivateRoutes'

// import DashboardProvider from './contexts/DashboardContext/DashboardProvider'
import NotFound from './pages/NotFound/NotFound'
import DashboardProvider from './contexts/DashboardContext/DashboardProvider'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'

const SignUp = lazy(() => import('./pages/Auth/Signup/Signup'))
const Login = lazy(() => import('./pages/Auth/Login/Login'))

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))

const Release = lazy(() => import('./pages/Release/Release'))

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <LoadingSpinner />
        </div>
      }>
      <Routes>
        {/* Login page */}
        <Route
          path="/"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />

        {/* Signup page */}
        <Route
          path="/sign-up/*"
          element={
            <PublicRoutes>
              <SignUp />
            </PublicRoutes>
          }
        />

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

        <Route
          path="/release/*"
          element={
            <PublicRoutes>
              <Release />
            </PublicRoutes>
          }
        />

        <Route
          path="*"
          element={
            <PublicRoutes>
              <NotFound />
            </PublicRoutes>
          }
        />
      </Routes>
    </Suspense>
  )
}

export default App
