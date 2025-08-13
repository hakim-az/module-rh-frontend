import React, { Suspense, useEffect, useState } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'

// Lazy load role components
const Employee = React.lazy(() => import('../Roles/Employee/Employee'))
const HR = React.lazy(() => import('../Roles/HR/HR'))
const Admin = React.lazy(() => import('../Roles/Admin/Admin'))
const CompleteProfile = React.lazy(
  () => import('../../pages/CompleteProfile/CompleteProfile')
)

// Define the user role type
type UserRole = 'complete-profile' | 'employee' | 'hr' | 'admin' | null

// Helper: Determine role from session storage
function getRoleFromSession(): UserRole {
  try {
    const storedUser = sessionStorage.getItem('auth_user')
    if (!storedUser) return null

    const user = JSON.parse(storedUser)

    // Check groups or realmAccess.roles to determine role
    if (user.groups?.includes('Users')) return 'employee'
    if (
      user.groups?.includes('Prospection-Commercial') ||
      user.groups?.includes('Prospection-Admin')
    ) {
      return 'employee'
    }
    if (user.groups?.includes('RH-Manager')) return 'hr'
    if (user.groups?.includes('Admins')) return 'admin'

    // Fallback: check realmAccess roles
    const roles: string[] = user.realmAccess?.roles || []
    if (roles.includes('admin')) return 'admin'
    if (roles.includes('hr')) return 'hr'
    if (roles.includes('employee')) return 'employee'

    return null
  } catch (err) {
    console.error('Failed to parse auth_user from sessionStorage', err)
    return null
  }
}

export default function Dashboard() {
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  useEffect(() => {
    const role = getRoleFromSession()
    setUserRole(role)
    setIsLoadingUser(false)
  }, [])

  // Map roles to components
  const roleComponents: Record<Exclude<UserRole, null>, React.ReactNode> = {
    'complete-profile': <CompleteProfile />,
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
