import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import EmployeeLayout from '@/components/Layouts/EmployeeLayout'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import CompleteProfileLayout from '@/components/Layouts/CompleteProfileLayout/CompleteProfileLayout'
import CompleteProfile from './CompleteProfile/CompleteProfile'

export type UserStatus = 'step-1' | 'step-2' | 'step-3' | 'step-4' | 'step-5'

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
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedRole = localStorage.getItem('userStatus') as UserStatus | null

      const validRoles: UserStatus[] = [
        'step-1',
        'step-2',
        'step-3',
        'step-4',
        'step-5',
      ]
      if (storedRole && validRoles.includes(storedRole)) {
        setUserStatus(storedRole)
      } else {
        setUserStatus('step-1') // or handle fallback
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

  if (userStatus !== 'step-5') {
    return (
      <Routes>
        {/* Home page */}
        <Route
          index
          element={
            <CompleteProfileLayout>
              <CompleteProfile userStatus={userStatus} />
            </CompleteProfileLayout>
          }
        />

        {/* Redirect any other route to index */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  if (userStatus === 'step-5') {
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
