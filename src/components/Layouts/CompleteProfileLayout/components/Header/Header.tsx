import { LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/KeyCloakContext/AuthContext'
import Logo from '@/assets/icons/logo-text.svg?react'
import NotificationBell from '@/components/Headers/NotificationBell/NotificationBell'

// Composant Header
export default function Header() {
  const { logout } = useAuth()

  return (
    <nav className="w-full bg-white shadow-sm mb-20">
      <div className="w-11/12 mx-auto max-w-[1200px] py-3 flex items-center justify-between">
        <Logo className="w-28 fill-transparent" />
        <NotificationBell />
        <button
          type="button"
          onClick={logout}
          className="flex border hover:border-blue-500 border-black text-sm hover:bg-blue-500 hover:text-white ease-in-out px-6 py-3 rounded-md transition-all delay-75 items-center cursor-pointer justify-center gap-5">
          Se déconnecter
          <LogOut />
        </button>
      </div>
    </nav>
  )
}
