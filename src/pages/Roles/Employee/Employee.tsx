import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import EmployeeLayout from '@/components/Layouts/EmployeeLayout'
import CompleteProfileLayout from '@/components/Layouts/CompleteProfileLayout/CompleteProfileLayout'
import CompleteProfile from '@/pages/CompleteProfile/CompleteProfile'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import IntegrationFormProvider from '@/contexts/CompleteProfile/IntegrationForm/IntegrationFormProvider'
import IntegrationForm from '@/pages/CompleteProfile/IntegrationForm/IntegrationForm'

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
  const statut = userDetails?.statut

  // Handle "user not approved" and "user registered" in a single switch
  if (statut === 'user-registred') {
    return (
      <Routes>
        <Route
          index
          element={
            <CompleteProfileLayout>
              <IntegrationFormProvider>
                <IntegrationForm />
              </IntegrationFormProvider>
            </CompleteProfileLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  if (statut === 'user-approuved') {
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

  // Fallback: any other statut
  return (
    <Routes>
      <Route
        index
        element={
          <CompleteProfileLayout>
            <CompleteProfile />
          </CompleteProfileLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
