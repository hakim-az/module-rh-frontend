import { LogOut } from 'lucide-react'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'

export default function LogoutCard() {
  // consts
  const { wideNavbar } = useDashboardContext()

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
          src="#"
          alt=""
          className=" size-11 min-w-11 min-h-11 rounded-md bg-white"
        />
        <div className={` flex-col gap-1  ${wideNavbar ? 'flex' : 'hidden'}`}>
          <span className="text-sm font-semibold">John Doe</span>
          <span className="text-xs">j.doe@finanssor@fr</span>
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
