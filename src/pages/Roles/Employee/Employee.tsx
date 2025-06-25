import React, { useEffect, useState } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import IntegrationFormProvider from '@/contexts/CompleteProfile/IntegrationForm/IntegrationFormProvider'

type UserStatus = 'step-1' | 'step-2' | 'step-3' | 'step-4'

// components
import EmployeeLayout from '@/components/Layouts/EmployeeLayout'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import IntegrationForm from './CompleteProfile/IntegrationForm/IntegrationForm'
import SignContract from './CompleteProfile/SignContract/SignContract'
import WaitRhResponse from './CompleteProfile/WaitResponse/WaitRhResponse'
import WaitContract from './CompleteProfile/WaitContract/WaitContract'

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

      const validRoles: UserStatus[] = ['step-1', 'step-2', 'step-3', 'step-4']
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

  if (userStatus === 'step-1') {
    return (
      <IntegrationFormProvider>
        <IntegrationForm />
      </IntegrationFormProvider>
    )
  }

  if (userStatus === 'step-2') {
    return <WaitContract />
  }

  if (userStatus === 'step-3') {
    return <SignContract />
  }

  if (userStatus === 'step-4') {
    return <WaitRhResponse />
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
}
