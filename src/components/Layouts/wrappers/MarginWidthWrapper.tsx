import type { ReactNode } from 'react'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'

export default function MarginWidthWrapper({
  children,
}: {
  children: ReactNode
}) {
  const { wideNavbar } = useDashboardContext()
  return (
    <div
      className={`flex flex-col w-screen lg:w-auto min-h-screen transition-all ease-in-out delay-150 ${wideNavbar ? 'lg:ml-[300px]' : 'lg:ml-[90px]'}`}>
      {children}
    </div>
  )
}
