import { Link, useLocation } from 'react-router-dom'
import useScroll from '@/hooks/useScroll/useScroll'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { CircleUserRound, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/KeyCloakContext/useAuth'
import NotificationBell from '../NotificationBell/NotificationBell'

function Header() {
  const { userDetails } = useDashboardContext()
  const { logout } = useAuth()
  const scrolled = useScroll(5)
  const location = useLocation()

  const selectedLayout = location.pathname.split('/')[1]

  const renderRole = (role: string | undefined) => {
    switch (role) {
      case 'admin':
        return 'Administrateur'
      case 'hr':
        return 'Ressource humaine'
      case 'assistant':
        return 'Asisstant RH'
      case 'gestionnaire':
        return 'Gestionnaire RH'
      case 'employee':
        return 'Employé'
      default:
        return 'Utilisateur'
    }
  }

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

          <div className="flex items-center gap-6">
            {/* Notifications Dropdown */}
            <NotificationBell />
            {/* User Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                {userDetails?.avatar === '' ? (
                  <div className="relative flex items-center justify-center size-11 rounded-xl bg-gradient-to-br from-slate-100 to-slate-100 hover:from-blue-50 hover:to-indigo-50 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-200">
                    <CircleUserRound className="w-7 h-7 text-slate-700 group-hover:text-blue-600 transition-colors" />
                  </div>
                ) : (
                  <img
                    src={userDetails?.avatar}
                    alt="user-avatar"
                    className="w-11 h-11 object-cover rounded-full border-2 border-[#96ABFF]"
                  />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0 rounded-2xl mr-4 mt-5">
                <div className="w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                    <div className="flex items-center gap-4">
                      {!userDetails?.avatar || userDetails.avatar === '' ? (
                        <div className="flex items-center justify-center size-16 rounded-xl bg-white/20 backdrop-blur-sm">
                          <CircleUserRound className="w-10 h-10 text-white" />
                        </div>
                      ) : (
                        <img
                          src={userDetails.avatar}
                          alt="Avatar utilisateur"
                          className="w-16 h-16 object-cover rounded-xl border-2 border-white/30 shadow-lg"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-lg capitalize truncate">
                          {userDetails?.nomDeNaissance} {userDetails?.prenom}
                        </p>
                        <p className="text-blue-100 text-sm truncate lowercase">
                          {userDetails?.emailPersonnel}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="mb-4 px-3 py-2 bg-slate-50 rounded-lg">
                      <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">
                        Rôle
                      </span>
                      <p className="text-sm font-semibold text-slate-900 capitalize mt-0.5">
                        {renderRole(userDetails?.role)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={logout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl transition-colors">
                      <LogOut className="w-5 h-5" />
                      Se déconnecter
                    </button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
