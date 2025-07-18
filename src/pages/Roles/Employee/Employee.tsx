import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import EmployeeLayout from '@/components/Layouts/EmployeeLayout'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import CompleteProfileLayout from '@/components/Layouts/CompleteProfileLayout/CompleteProfileLayout'
import CompleteProfile from './CompleteProfile/CompleteProfile'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'

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

export default function Employee() {
  const { userDetails } = useDashboardContext()

  if (userDetails === null) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (userDetails?.statut !== 'user-approuved') {
    return (
      <Routes>
        {/* Home page */}
        <Route
          index
          element={
            <CompleteProfileLayout>
              <CompleteProfile />
            </CompleteProfileLayout>
          }
        />

        {/* Redirect any other route to index */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  if (userDetails?.statut === 'user-approuved') {
    return (
      <Routes>
        <Route
          element={
            <EmployeeLayout>
              <Outlet />
            </EmployeeLayout>
          }>
          <Route index element={<Accueil />} />
          <Route path="absences/*" element={<Absences />} />
          <Route path="coffre-fort/*" element={<CoffreFort />} />
          <Route path="titre-restaurant/*" element={<TitreRestaurant />} />
          <Route path="informations-personnelles/*" element={<InfoPerso />} />
          <Route
            path="informations-professionnelles/*"
            element={<InfosPro />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    )
  }
}
