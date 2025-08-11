import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { Link } from 'react-router-dom'

type UserRole = 'employee' | 'hr' | 'admin'

function LogoCard() {
  const { wideNavbar, userDetails } = useDashboardContext()
  const role = userDetails?.role as UserRole | undefined

  const findRole = (role?: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Admin'
      case 'hr':
        return 'RH'
      case 'employee':
        return 'Salarié'
      default:
        return undefined
    }
  }

  return (
    <Link to="/" className="flex items-center justify-center h-28">
      {wideNavbar ? (
        <span className="flex capitalize w-full px-8 text-white items-start justify-start text-3xl font-medium gap-x-5 text-primaryBlue">
          {findRole(role)}
        </span>
      ) : (
        <span className="flex capitalize text-white items-center justify-center w-full">
          {findRole(role)}
        </span>
      )}
    </Link>
  )
}

export default LogoCard
