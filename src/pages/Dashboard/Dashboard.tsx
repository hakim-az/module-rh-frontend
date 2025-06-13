import React, { Suspense, useEffect, useState } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'

// Define the user role type
type UserRole = 'employee' | 'hr' | 'admin' | null

// Lazy load role components
const Employee = React.lazy(() => import('../Roles/Employee/Employee'))
const HR = React.lazy(() => import('../Roles/HR/HR'))
const Admin = React.lazy(() => import('../Roles/Admin/Admin'))

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<UserRole | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedRole = localStorage.getItem('userRole') as UserRole | null

      // Validate the stored role
      const validRoles: UserRole[] = ['employee', 'hr', 'admin']
      if (storedRole && validRoles.includes(storedRole)) {
        setUserRole(storedRole)
      } else {
        // Fallback: you can redirect or default
        setUserRole(null)
      }

      setLoading(false)
    }, 10)

    return () => clearTimeout(timer)
  }, [])

  if (loading || userRole === null) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <LoadingSpinner />
        </div>
      }>
      {userRole === 'employee' && <Employee />}
      {userRole === 'hr' && <HR />}
      {userRole === 'admin' && <Admin />}
    </Suspense>
  )
}
