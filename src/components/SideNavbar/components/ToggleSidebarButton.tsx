import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

function ToggleSidebarButton() {
  const { wideNavbar, setWideNavbar } = useDashboardContext()
  return (
    <div
      onClick={() => setWideNavbar(!wideNavbar)}
      className="flex items-center justify-center w-7 h-7 shadow-md z-[100] bg-white rounded-md border border-black/15 absolute -right-4 top-24 cursor-pointer">
      <ChevronLeftIcon className="h-4 stroke-darkBlue " />
      <ChevronRightIcon className="h-4 stroke-darkBlue " />
    </div>
  )
}

export default ToggleSidebarButton
