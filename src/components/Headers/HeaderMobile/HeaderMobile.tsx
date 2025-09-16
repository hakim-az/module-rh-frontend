import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useCycle } from 'framer-motion'
// import {
//   Cog8ToothIcon,
//   BellIcon,
//   EnvelopeIcon,
// } from '@heroicons/react/24/outline'
import MenuToggle from '../Components/MenuToggle'
import MenuItem from '../Components/MenuItem'

import { Briefcase, FileText } from 'lucide-react'
import { useAuth } from '@/contexts/KeyCloakContext/AuthContext'
import { LogOut } from 'lucide-react'

interface NavLinkType {
  name: string
  path: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
}

interface PropsType {
  nameRoute: string
  navlinkMobile: NavLinkType[]
}

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
    transition: {
      type: 'spring' as const,
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(0px at 100% 0)',
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 40,
    },
  },
}

const variants = {
  open: {
    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
  },
  closed: {
    transition: { staggerChildren: 0.01, staggerDirection: -1 },
  },
}

function HeaderMobile({ navlinkMobile }: PropsType) {
  const location = useLocation()
  const { logout } = useAuth()
  const { pathname } = location
  const containerRef = useRef<HTMLDivElement>(null)

  const [isOpen, toggleOpen] = useCycle(false, true)

  // Handle use dimensions
  const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
    const dimensions = useRef({ width: 0, height: 0 })

    useEffect(() => {
      if (ref.current) {
        dimensions.current.width = ref.current.offsetWidth
        dimensions.current.height = ref.current.offsetHeight
      }
    }, [ref])

    return dimensions.current
  }

  const { height } = useDimensions(containerRef)

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      className={`fixed inset-0 z-50 w-full lg:hidden ${isOpen ? '' : 'pointer-events-none'}`}
      ref={containerRef}>
      <motion.div
        className="absolute inset-0 right-0 w-full bg-white"
        variants={sidebar}
      />
      <motion.ul
        variants={variants}
        className={`absolute min-h-screen w-full flex-col gap-3 px-10 py-16 overflow-y-auto ${isOpen ? 'flex' : 'hidden'}`}>
        {navlinkMobile.map((item) => (
          <div key={item.path}>
            <MenuItem className="flex items-center gap-4 py-3 border-b border-b-secondGray">
              {item.icon && (
                <item.icon className={`w-5 group-hover:text-black `} />
              )}
              <Link
                to={item.path}
                onClick={() => toggleOpen()}
                className={`flex text-xl ${item.path === pathname ? 'font-bold text-darkBlue' : ''}`}>
                {item.name}
              </Link>
            </MenuItem>
          </div>
        ))}
        <div>
          <MenuItem className="flex items-center gap-4 py-3 border-b border-b-secondGray">
            <FileText
              className={`w-8 ${'informations-personnelles' === pathname ? 'fill-darkBlue' : 'fill-primaryblack'}`}
            />
            <Link
              to="/accueil/informations-personnelles"
              onClick={() => toggleOpen()}
              className={`flex text-xl ${'informations-personnelles' === pathname ? 'font-bold text-darkBlue' : ''}`}>
              Informations personnelles
            </Link>
          </MenuItem>
        </div>
        <div>
          <MenuItem className="flex items-center gap-4 py-3 border-b border-b-secondGray">
            <Briefcase
              className={`w-8 ${'informations-professionnelles' === pathname ? 'fill-darkBlue' : 'fill-primaryblack'}`}
            />
            <Link
              to="/accueil/informations-professionnelles"
              onClick={() => toggleOpen()}
              className={`flex text-xl ${'informations-professionnelles' === pathname ? 'font-bold text-darkBlue' : ''}`}>
              Informations professionnelles
            </Link>
          </MenuItem>
        </div>
        <div className="mt-40 w-full flex items-center justify-center">
          <span
            onClick={logout}
            className="flex items-center justify-center gap-4 text-white bg-black px-5 py-2 rounded-md">
            Se déconnecter <LogOut />
          </span>
        </div>
      </motion.ul>

      <MenuToggle toggle={toggleOpen} />
    </motion.nav>
  )
}

export default HeaderMobile
