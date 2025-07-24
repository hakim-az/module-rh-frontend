import { LogOut } from 'lucide-react'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import DefaultAvatar from '@/assets/icons/user-avatar.png'

export default function LogoutCard() {
  // consts
  const { wideNavbar, userDetails } = useDashboardContext()

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    window.location.href = 'http://localhost:5173/'
  }
  return (
    <div
      className={`text-white flex items-center p-8 w-full ${wideNavbar ? 'justify-between' : 'justify-center'}`}>
      {/* avatar */}
      <div className="flex items-center gap-4">
        <img
          src={userDetails?.avatar === '' ? DefaultAvatar : userDetails?.avatar}
          alt="user-avatar"
          className=" size-11 min-w-11 min-h-11 rounded-md bg-white"
        />
        <div className={` flex-col gap-1  ${wideNavbar ? 'flex' : 'hidden'}`}>
          <span className="text-sm font-semibold">
            {userDetails?.nomDeNaissance} {userDetails?.prenom}
          </span>
          <span className="text-xs">{userDetails?.emailProfessionnel} </span>
        </div>
      </div>
      {/* logout */}
      <LogOut
        onClick={handleLogout}
        className={`text-white hover:text-red-500 cursor-pointer transition-all ease-in-out delay-75 ${wideNavbar ? 'block' : 'hidden'}`}
      />
    </div>
  )
}
