import { LogOut } from 'lucide-react'

export default function Header() {
  return (
    <nav className="w-full bg-white shadow-sm mb-20">
      {/* container */}
      <div className="w-11/12 mx-auto max-w-[1200px] py-6 flex items-center justify-between">
        {/* logo */}
        <span className="text-2xl font-medium">Logo</span>
        {/* logout */}
        <button
          type="button"
          className="flex hover:bg-blue-500 hover:text-white ease-in-out px-6 py-3 rounded-md transition-all delay-75 items-center cursor-pointer justify-center gap-5">
          Se déconnecter
          <LogOut />
        </button>
      </div>
    </nav>
  )
}
