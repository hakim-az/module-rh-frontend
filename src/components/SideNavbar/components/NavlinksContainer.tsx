import { NavLink, useLocation } from 'react-router-dom'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import type { NavLinkType } from '../SideNavbar'

interface PropsType {
  navlinkSidebar: NavLinkType[]
  menuHeader: string
}

function NavlinksContainer({ navlinkSidebar, menuHeader }: PropsType) {
  // consts
  const location = useLocation()

  const { wideNavbar } = useDashboardContext()

  // handle active change
  const isActiveChange = (current: string) => {
    if (location.pathname === current) {
      return true
    }
    return false
  }
  return (
    <nav className="w-full px-5 mx-auto space-y-[10px]">
      <span
        className={`text-white font-semibold text-xl mb-3  ${wideNavbar ? 'inline-block' : 'hidden'}`}>
        {menuHeader}
      </span>
      {navlinkSidebar.map((navlink) => (
        <div
          className="relative flex items-center justify-end"
          key={navlink.path}>
          <NavLink
            to={`${navlink.path}`}
            title={navlink.name}
            className={` h-10 w-11/12 group ${
              isActiveChange(`${navlink.path}`) && ' bg-white'
            } rounded flex items-center ${
              wideNavbar ? 'justify-start w-10/12' : 'justify-center w-14'
            } gap-2 mt-1 hover:text-primaryBlue hover:bg-white hover:font-bold `}>
            <div
              className={`Icon w-7 h-7 ${
                isActiveChange(`${navlink.path}`) ? ' bg-white ' : ''
              } rounded flex items-center justify-center mx-[6px] `}>
              {navlink.icon && (
                <navlink.icon
                  className={`w-5 group-hover:text-black ${
                    isActiveChange(`${navlink.path}`)
                      ? 'fill-black text-black'
                      : 'fill-white text-white'
                  }`}
                />
              )}
            </div>
            <h3
              className={` text-sm truncate group-hover:text-black ${wideNavbar ? 'block' : 'hidden'} ${isActiveChange(`${navlink.path}`) ? ' text-black font-bold ' : 'text-white '}`}>
              {navlink.name}
            </h3>
          </NavLink>
        </div>
      ))}
    </nav>
  )
}

export default NavlinksContainer
