// compoenets
import { useLocation } from 'react-router-dom'
import {
  Home,
  Users,
  CalendarOff,
  Lock,
  CreditCard,
  FileText,
  Briefcase,
} from 'lucide-react'

import Header from '../Headers/HeaderDesktop/HeaderDesktop'
import HeaderMobile from '../Headers/HeaderMobile/HeaderMobile'
import SideNavBarInfluencer from '../SideNavbar/SideNavbar'
import PageWrapper from './wrappers/PageWrapper'
import MarginWidthWrapper from './wrappers/MarginWidthWrapper'

export interface IPramasHrLayout {
  children: React.ReactNode
}

interface NavLinkType {
  name: string
  path: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export default function HrLayout({ children }: IPramasHrLayout) {
  const location = useLocation()
  const title = location.pathname.split('/')
  const nameRoute =
    title[title.length - 1].charAt(0).toUpperCase() +
    title[title.length - 1].slice(1)

  const navlinks: NavLinkType[] = [
    {
      name: 'Accueil',
      path: '/accueil',
      icon: Home,
    },
    {
      name: 'Salariés',
      path: '/accueil/salariés',
      icon: Users,
    },
    {
      name: 'Absences',
      path: '/accueil/absences',
      icon: CalendarOff,
    },
    {
      name: 'Coffre fort',
      path: '/accueil/coffre-fort',
      icon: Lock,
    },
    {
      name: 'Titre restaurant',
      path: '/accueil/titre-restaurant',
      icon: CreditCard,
    },
  ]

  const navlinkSidebarProfile: NavLinkType[] = [
    {
      name: 'Informations personnelles',
      path: '/accueil/informations-personnelles',
      icon: FileText,
    },
    {
      name: 'Informations Professionnelles',
      path: '/accueil/informations-professionnelles',
      icon: Briefcase,
    },
  ]
  return (
    <div className="flex bg-[#f6f9ff] font-poppins">
      <SideNavBarInfluencer
        navlinkSidebar={navlinks}
        navlinkSidebarProfile={navlinkSidebarProfile}
      />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header nameRoute={nameRoute} />
          <HeaderMobile navlinkMobile={navlinks} nameRoute={nameRoute} />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  )
}
