import React, { Suspense, useEffect, useState } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'

// Define the user role type
type UserRole = 'employee' | 'hr' | 'admin' | null

// Lazy load role components
const Employee = React.lazy(() => import('../Roles/Employee/Employee'))
const HR = React.lazy(() => import('../Roles/HR/HR'))
const Admin = React.lazy(() => import('../Roles/Admin/Admin'))

// Helper: Validate role
function getValidRole(role: string | null | undefined): UserRole {
  const validRoles: UserRole[] = ['employee', 'hr', 'admin']
  return role && validRoles.includes(role as UserRole)
    ? (role as UserRole)
    : null
}

export default function Dashboard() {
  const { userDetails, isLoadingUser } = useDashboardContext()
  const [userRole, setUserRole] = useState<UserRole>(null)

  useEffect(() => {
    if (userDetails?.role) {
      setUserRole(getValidRole(userDetails.role))
    } else {
      setUserRole(null)
    }
  }, [userDetails])

  // Map roles to components for cleaner rendering
  const roleComponents: Record<Exclude<UserRole, null>, React.ReactNode> = {
    employee: <Employee />,
    hr: <HR />,
    admin: <Admin />,
  }

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  if (!userRole) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <p className="text-lg font-semibold">Invalid role or not logged in.</p>
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
      {roleComponents[userRole]}
    </Suspense>
  )
}
