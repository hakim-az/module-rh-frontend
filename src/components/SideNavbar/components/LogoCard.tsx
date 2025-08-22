import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { Link } from 'react-router-dom'
import LogoText from '@/assets/icons/logo-horizontal.svg?react'
import LogoSimple from '@/assets/icons/logo-simple.svg?react'

function LogoCard() {
  const { wideNavbar } = useDashboardContext()

  return (
    <Link to="/" className="flex items-center justify-center">
      {wideNavbar ? (
        <LogoText className="h-26 mx-auto mt-6 fill-transparent" />
      ) : (
        <LogoSimple className="h-16 mt-6 mx-auto fill-transparent" />
      )}
    </Link>
  )
}

export default LogoCard
