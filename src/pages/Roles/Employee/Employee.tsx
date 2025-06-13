import React, { useEffect, useState } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
// import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'

type UserRole = 'signed' | 'not-signed'

// components
import EmployeeLayout from '@/components/Layouts/EmployeeLayout'
import CompleteProfile from './CompleteProfile/CompleteProfile'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'

/* ROUTES */
const NotFound = React.lazy(() => import('@/pages/NotFound/NotFound'))

const Accueil = React.lazy(() => import('./Accueil/Accueil'))
const Absences = React.lazy(() => import('./Absences/Absences'))
const CoffreFort = React.lazy(() => import('./CoffreFort/CoffreFort'))
const TitreRestaurant = React.lazy(
  () => import('./TitreRestaurant/TitreRestaurant')
)
const InfoPerso = React.lazy(() => import('./Profile/InfosPerso/InfoPerso'))
const InfosPro = React.lazy(() => import('./Profile/InfosPro/InfosPro'))

function DesignerDashboard() {
  const [userStatus, setUserStatus] = useState<UserRole | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedRole = localStorage.getItem('userStatus') as UserRole | null

      const validRoles: UserRole[] = ['signed', 'not-signed']
      if (storedRole && validRoles.includes(storedRole)) {
        setUserStatus(storedRole)
      } else {
        setUserStatus('not-signed') // or handle fallback
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (userStatus === null) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (userStatus === 'not-signed') {
    return <CompleteProfile />
  }

  return (
    <Routes>
      <Route
        element={
          <EmployeeLayout>
            <Outlet />
          </EmployeeLayout>
        }>
        {/* Home page */}
        <Route index element={<Accueil />} />

        {/* Home page */}
        <Route path="absences" element={<Absences />} />

        {/* Home page */}
        <Route path="coffre-fort" element={<CoffreFort />} />

        {/* Home page */}
        <Route path="titre-restaurant" element={<TitreRestaurant />} />

        {/* Home page */}
        <Route path="informations-personnelles" element={<InfoPerso />} />

        {/* Home page */}
        <Route path="informations-professionnelles" element={<InfosPro />} />

        {/* Not Found page */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
export default DesignerDashboard
