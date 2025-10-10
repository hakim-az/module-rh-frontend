import React, { Suspense, useEffect, useState } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import Assistant from '../Roles/Assistant/Assistant'
import Gestionnaire from '../Roles/Gestionnaire/Gestionnaire'
import { useNavigate } from 'react-router-dom'

// Lazy load role components
const Employee = React.lazy(() => import('../Roles/Employee/Employee'))
const HR = React.lazy(() => import('../Roles/HR/HR'))
const Admin = React.lazy(() => import('../Roles/Admin/Admin'))
const CompleteProfile = React.lazy(
  () => import('../CompleteProfile/CompleteProfile')
)

// Define the user role type
type UserRole =
  | 'complete-profile'
  | 'employee'
  | 'hr'
  | 'admin'
  | 'assistant'
  | 'gestionnaire'
  | null

// Helper: Determine role from session storage
// function getRoleFromSession(): UserRole {
//   try {
//     const storedUser = sessionStorage.getItem('auth_user')
//     if (!storedUser) return null

//     const user = JSON.parse(storedUser)
//     // Ensure realm roles are available before any checks that use them
//     const roles: string[] = user.realmAccess?.roles || []

//     // Check groups or realmAccess.roles to determine role
//     if (user.groups?.includes('Users')) return 'employee'
//     if (
//       // salariés
//       user.groups?.includes('Comptabilité') ||
//       user.groups?.includes('Formation') ||
//       user.groups?.includes('Gestion') ||
//       user.groups?.includes('IT') ||
//       user.groups?.includes('Marketing-Communication') ||
//       user.groups?.includes('Ressources-Humaines') ||
//       // prospection
//       user.groups?.includes('Prospection-Admin') ||
//       user.groups?.includes('Prospection-Commercial') ||
//       user.groups?.includes('Prospection-Directeur') ||
//       user.groups?.includes('Prospection-Gestionnaire') ||
//       user.groups?.includes('Prospection-Manager') ||
//       // vente
//       user.groups?.includes('Vente-Admin') ||
//       user.groups?.includes('Vente-Commercial') ||
//       user.groups?.includes('Vente-Manager')
//     ) {
//       return 'employee'
//     }
//     if (user.groups?.includes('RH-Manager')) return 'hr'
//     if (user.groups?.includes('RH-Assistant')) return 'assistant'
//     if (user.groups?.includes('RH-Gestionnaire')) return 'gestionnaire'
//     if (user.groups?.includes('RH-Admin')) return 'admin'

//     // Fallback: check realmAccess roles
//     if (roles.includes('admin')) return 'admin'
//     if (roles.includes('hr')) return 'hr'
//     if (roles.includes('assistant')) return 'assistant'
//     if (roles.includes('employee')) return 'employee'

//     return null
//   } catch (err) {
//     console.error('Failed to parse auth_user from sessionStorage', err)
//     return null
//   }
// }

function getRoleFromSession(): UserRole {
  try {
    const storedUser = sessionStorage.getItem('auth_user')
    if (!storedUser) return null

    const user = JSON.parse(storedUser)
    const roles: string[] = user.realmAccess?.roles || []
    const groups: string[] = user.groups || []

    // 🧠 Step 1: Highest priority — explicit HR roles
    if (groups.includes('RH-Admin') || roles.includes('admin')) return 'admin'
    if (groups.includes('RH-Manager') || roles.includes('hr')) return 'hr'
    if (groups.includes('RH-Assistant') || roles.includes('assistant'))
      return 'assistant'
    if (groups.includes('RH-Gestionnaire')) return 'gestionnaire'

    // 🧩 Step 2: Other groups mapped to employee
    const employeeGroups = [
      'Users',
      'Comptabilité',
      'Formation',
      'Gestion',
      'IT',
      'Marketing-Communication',
      'Ressources-Humaines',
      'Prospection-Admin',
      'Prospection-Commercial',
      'Prospection-Directeur',
      'Prospection-Gestionnaire',
      'Prospection-Manager',
      'Vente-Admin',
      'Vente-Commercial',
      'Vente-Manager',
    ]

    if (
      employeeGroups.some((g) => groups.includes(g)) ||
      roles.includes('employee')
    ) {
      return 'employee'
    }

    return null
  } catch (err) {
    console.error('Failed to parse auth_user from sessionStorage', err)
    return null
  }
}

export default function Dashboard() {
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  const navigate = useNavigate()

  // Inactivity timeout
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const resetTimer = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        sessionStorage.removeItem('auth_user')
        navigate('/')
        window.location.reload()
      }, 600_000) // ⏳ 10 minutes
    }

    // Écoute des événements d'activité
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']
    events.forEach((event) => window.addEventListener(event, resetTimer))

    resetTimer() // démarre au montage

    return () => {
      clearTimeout(timeoutId)
      events.forEach((event) => window.removeEventListener(event, resetTimer))
    }
  }, [navigate])

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
    assistant: <Assistant />,
    gestionnaire: <Gestionnaire />,
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
