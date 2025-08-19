import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import LogoCard from './components/LogoCard'
import NavlinksContainer from './components/NavlinksContainer'
import ToggleSidebarButton from './components/ToggleSidebarButton'
import LogoutCard from './components/LogoutCard'

type UserRole = 'employee' | 'hr' | 'admin'

export interface NavLinkType {
  name: string
  path: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

interface PropsType {
  navlinkSidebar: NavLinkType[]
  navlinkSidebarProfile: NavLinkType[]
}

export default function SideNavbar({
  navlinkSidebar,
  navlinkSidebarProfile,
}: PropsType) {
  const { wideNavbar, userDetails } = useDashboardContext()

  const role = userDetails?.role as UserRole | undefined

  const sidebarBg = (role?: UserRole) => {
    switch (role) {
      case 'admin':
        return '#1B86CB'
      case 'hr':
        return '#4141D2'
      case 'employee':
        return '#09090B'
      default:
        return undefined
    }
  }

  return (
    <div
      style={{ backgroundColor: sidebarBg(role) }}
      className={`side-navbar transition-all z-20 ease-in-out delay-150 font-poppins h-screen w-full flex-1 fixed hidden lg:flex flex-col items-center justify-between border-r ${
        wideNavbar ? 'md:w-[300px]' : 'md:w-[90px]'
      }`}>
      {/* menu links */}
      <div className="flex flex-col gap-8 w-full transition-all ease-in-out delay-200">
        {/* logo */}
        <LogoCard />

        {/* button wide navbar */}
        <ToggleSidebarButton />

        {/* platform */}
        <NavlinksContainer
          navlinkSidebar={navlinkSidebar}
          menuHeader="Platform"
        />

        {/* profile */}
        <NavlinksContainer
          navlinkSidebar={navlinkSidebarProfile}
          menuHeader="Profile"
        />
      </div>

      {/* logout card */}
      <LogoutCard />
    </div>
  )
}
