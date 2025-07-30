import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import AdminLayout from '@/components/Layouts/AdminLayout'

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

export default function HR() {
  return (
    <Routes>
      <Route
        element={
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        }>
        <Route index element={<Accueil />} />
        <Route path="absences/*" element={<Absences />} />
        <Route path="salariés/*" element={<Salaries />} />
        <Route path="coffre-fort/*" element={<CoffreFort />} />
        <Route path="titre-restaurant/*" element={<TitreRestaurant />} />
        <Route path="informations-personnelles" element={<InfoPerso />} />
        <Route path="informations-professionnelles" element={<InfosPro />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
