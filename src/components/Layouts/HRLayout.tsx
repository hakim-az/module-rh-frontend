// compoenets
import { useLocation } from 'react-router-dom'
import { LayoutGrid } from 'lucide-react'

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
      icon: LayoutGrid,
    },
    {
      name: 'Salariés',
      path: '/accueil/salariés',
      icon: LayoutGrid,
    },
    {
      name: 'Absences',
      path: '/accueil/absences',
      icon: LayoutGrid,
    },
    {
      name: 'Coffre fort',
      path: '/accueil/coffre-fort',
      icon: LayoutGrid,
    },
    {
      name: 'Titre restaurant',
      path: '/accueil/titre-restaurant',
      icon: LayoutGrid,
    },
  ]

  const navlinkSidebarProfile: NavLinkType[] = [
    {
      name: 'Informations personnelles',
      path: '/accueil/informations-personnelles',
      icon: LayoutGrid,
    },
    {
      name: 'Informations Professionnelles',
      path: '/accueil/informations-professionnelles',
      icon: LayoutGrid,
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
