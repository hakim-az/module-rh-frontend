import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
// import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'

// components
import HRLayout from '@/components/Layouts/HRLayout'

/* ROUTES */
const NotFound = React.lazy(() => import('@/pages/NotFound/NotFound'))

const Accueil = React.lazy(() => import('./Accueil/Accueil'))
const Salaries = React.lazy(() => import('./Salaries/Salaries'))
const Absences = React.lazy(() => import('./Absences/Absences'))
const CoffreFort = React.lazy(() => import('./CoffreFort/CoffreFort'))
const TitreRestaurant = React.lazy(
  () => import('./TitreRestaurant/TitreRestaurant')
)
const InfoPerso = React.lazy(() => import('./Profile/InfosPerso/InfoPerso'))
const InfosPro = React.lazy(() => import('./Profile/InfosPro/InfosPro'))

function DesignerDashboard() {
  return (
    <Routes>
      <Route
        element={
          <HRLayout>
            <Outlet />
          </HRLayout>
        }>
        {/* Home page */}
        <Route index element={<Accueil />} />

        {/* Home page */}
        <Route path="absences" element={<Absences />} />

        {/* Home page */}
        <Route path="salariés" element={<Salaries />} />

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
