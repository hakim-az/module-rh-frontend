import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useCycle } from 'framer-motion'
import { HomeIcon } from '@heroicons/react/16/solid'
// import {
//   Cog8ToothIcon,
//   BellIcon,
//   EnvelopeIcon,
// } from '@heroicons/react/24/outline'
import MenuToggle from '../Components/MenuToggle'
import MenuItem from '../Components/MenuItem'

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
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(0px at 100% 0)',
    transition: {
      type: 'spring',
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

function HeaderMobile({ navlinkMobile, nameRoute }: PropsType) {
  const location = useLocation()
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

  console.log(nameRoute)

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
              <HomeIcon
                className={`w-8 ${item.path === pathname ? 'fill-darkBlue' : 'fill-primaryblack'}`}
              />
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
            <HomeIcon
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
            <HomeIcon
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
        {/* <motion.div
          variants={sidebar}
          className="absolute bottom-16 left-0 right-0 flex mx-auto w-full items-center justify-center gap-8">
          <Link
            to="/dashboard/messages"
            onClick={() => toggleOpen()}
            className="w-9 relative">
            <span className="w-[10px] h-[10px] right-1 top-1 rounded-full bg-errorColor absolute" />
            <EnvelopeIcon
              className={`w-9 p-1 cursor-pointer rounded hover:stroke-white hover:bg-darkBlue  ${nameRoute === 'Messages' ? 'stroke-white bg-darkBlue' : 'bg-[#F8F9FA] stroke-darkBlue'}`}
            />
          </Link>
          <Link
            to="/dashboard/notifications"
            onClick={() => toggleOpen()}
            className="w-9 relative">
            <span className="w-[10px] h-[10px] right-1 top-1 rounded-full bg-errorColor absolute" />
            <BellIcon
              className={`w-9 p-1 cursor-pointer rounded hover:stroke-white hover:bg-darkBlue  ${nameRoute === 'Notifications' ? 'stroke-white bg-darkBlue' : 'bg-[#F8F9FA] stroke-darkBlue'}`}
            />
          </Link>
          <Link
            to="/dashboard/account-settings"
            onClick={() => toggleOpen()}
            className="w-9 relative">
            <Cog8ToothIcon
              className={`w-9 p-1 cursor-pointer rounded hover:stroke-white hover:bg-darkBlue  ${nameRoute === 'Account-settings' ? 'stroke-white bg-darkBlue' : 'bg-[#F8F9FA] stroke-darkBlue'}`}
            />
          </Link>
        </motion.div> */}
      </motion.ul>

      <MenuToggle toggle={toggleOpen} />
    </motion.nav>
  )
}

export default HeaderMobile
