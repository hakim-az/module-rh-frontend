import NotFound from '@/pages/NotFound/NotFound'
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

type UserStatus = 'step-1' | 'step-2' | 'step-3' | 'step-4'

// pages
const Home = React.lazy(() => import('./pages/Home/Home'))
const DetailsSalarie = React.lazy(
  () => import('./pages/DetailsSalarie/DetailsSalarie')
)
const ValidateSalarie = React.lazy(
  () => import('./pages/ValidateSalarie/ValidateSalarie')
)

function DetailsRouteWrapper({
  userStatus,
}: {
  userStatus: UserStatus | null
}) {
  if (userStatus === 'step-1' || userStatus === 'step-2') {
    return <DetailsSalarie />
  } else {
    return <ValidateSalarie />
  }
}

export default function Salaries() {
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedRole = localStorage.getItem('userStatus') as UserStatus | null
      const validRoles: UserStatus[] = ['step-1', 'step-2', 'step-3', 'step-4']

      if (storedRole && validRoles.includes(storedRole)) {
        setUserStatus(storedRole)
      } else {
        setUserStatus('step-1') // fallback
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* all employees */}
        <Route index element={<Home />} />

        {/* employee contract */}
        <Route
          path="details/:id"
          element={<DetailsRouteWrapper userStatus={userStatus} />}
        />

        {/* Not Found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  )
}
