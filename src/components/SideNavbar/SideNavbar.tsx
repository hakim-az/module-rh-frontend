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
  // consts
  const { wideNavbar } = useDashboardContext()

  const storedRole = localStorage.getItem('userRole') as UserRole

  const sidebarBg = (storedRole: string) => {
    switch (storedRole) {
      case 'admin':
        return '#1E3A8A'
      case 'hr':
        return '#4141D2'
      case 'employee':
        return '#09090B'
      default:
        return undefined
    }
  }

  return (
    <>
      <div
        style={{ backgroundColor: sidebarBg(storedRole) }}
        className={`side-navbar transition-all z-20 ease-in-out delay-150 font-poppins h-screen w-full flex-1 fixed hidden lg:flex flex-col items-center justify-between border-r ${wideNavbar ? 'md:w-[300px]' : 'md:w-[90px]'}`}>
        {/* menu links */}
        <div className="flex flex-col gap-8 w-full transition-all ease-in-out delay-200">
          {/* logo */}
          <LogoCard />

          {/* button wide navbar */}
          <ToggleSidebarButton />

          {/* platforme */}
          <NavlinksContainer
            navlinkSidebar={navlinkSidebar}
            menuHeader="Platforme"
          />

          {/* platforme */}
          <NavlinksContainer
            navlinkSidebar={navlinkSidebarProfile}
            menuHeader="Profile"
          />
        </div>
        {/* logout card */}
        <LogoutCard />
      </div>
    </>
  )
}
