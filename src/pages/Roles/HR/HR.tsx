import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import HRLayout from '@/components/Layouts/HRLayout'

/* ROUTES */
const NotFound = React.lazy(() => import('@/pages/NotFound/NotFound'))

const Accueil = React.lazy(() => import('./Accueil/Accueil'))
const Salaries = React.lazy(() => import('./Salaries/Salaries'))
const Absences = React.lazy(() => import('../../CommonPages/Absences/Absences'))
const CoffreFort = React.lazy(
  () => import('../../CommonPages/CoffreFort/CoffreFort')
)
const TitreRestaurant = React.lazy(
  () => import('../../CommonPages/TitreRestaurant/TitreRestaurant')
)

export default function HR() {
  return (
    <Routes>
      <Route
        element={
          <HRLayout>
            <Outlet />
          </HRLayout>
        }>
        <Route index element={<Accueil />} />
        <Route path="absences/*" element={<Absences />} />
        <Route path="salariés/*" element={<Salaries />} />
        <Route path="coffre-fort/*" element={<CoffreFort />} />
        <Route path="titre-restaurant/*" element={<TitreRestaurant />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
