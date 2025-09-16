import { Link, useLocation } from 'react-router-dom'
import useScroll from '@/hooks/useScroll/useScroll'
import { cn } from '@/lib/utils'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { CircleUserRound } from 'lucide-react'
import { useAuth } from '@/contexts/KeyCloakContext/useAuth'
import NotificationBell from '../NotificationBell/NotificationBell'

function Header() {
  const { userDetails } = useDashboardContext()
  const { logout } = useAuth()
  const scrolled = useScroll(5)
  const location = useLocation()

  const selectedLayout = location.pathname.split('/')[1]

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all shadow`,
        {
          'bg-white/75 backdrop-blur-lg': scrolled,
          'bg-white': selectedLayout,
        }
      )}>
      <div className="flex h-[80px] items-center justify-between px-6">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex flex-row items-center justify-center space-x-3 lg:hidden">
            <span className="flex text-xl font-bold">Module RH</span>
          </Link>
        </div>

        <div className="items-center justify-between hidden w-full lg:flex">
          <span className="text-xl font-semibold capitalize text-primaryBlue">
            {(() => {
              const parts = location.pathname.split('/')
              const lastPart = parts[parts.length - 1]
              const beforeLastPart = parts[parts.length - 2]

              const isId =
                /^[0-9a-fA-F-]{36}$/.test(lastPart) || !isNaN(Number(lastPart))

              return decodeURIComponent(
                isId
                  ? beforeLastPart.replace(/-/g, ' ')
                  : lastPart.replace(/-/g, ' ')
              )
            })()}
          </span>

          <div className="flex items-center gap-5">
            {/* Notifications Dropdown */}
            <NotificationBell />
            {/* User Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                {userDetails?.avatar === '' ? (
                  <CircleUserRound width={40} height={40} />
                ) : (
                  <img
                    src={userDetails?.avatar}
                    alt="user-avatar"
                    className="w-11 h-11 object-cover rounded-full border-2 border-[#96ABFF]"
                  />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-3 mt-2 -mr-28">
                <DropdownMenuItem
                  onClick={logout}
                  className="flex items-center cursor-pointer gap-x-5 font-robotoMedium text-primaryblack">
                  <ArrowLeftEndOnRectangleIcon className="w-5" /> Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* info */}
            <div className="flex flex-col">
              <span className="font-medium capitalize">
                {userDetails?.role}{' '}
              </span>
              <span className="text-sm">
                {userDetails?.nomDeNaissance} {userDetails?.prenom}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
