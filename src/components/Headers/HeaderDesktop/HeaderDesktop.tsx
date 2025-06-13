import { Link, useLocation, useNavigate } from 'react-router-dom'
import useScroll from '@/hooks/useScroll/useScroll'
import { cn } from '@/lib/utils'
import {
  BellIcon,
  ArrowLeftEndOnRectangleIcon,
} from '@heroicons/react/24/outline'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import axios from 'axios'

interface PropsType {
  nameRoute: string
}

function Header({ nameRoute }: PropsType) {
  // token
  const userToken = window.localStorage.getItem('usertype')

  const scrolled = useScroll(5)
  const location = useLocation()

  // Assuming the selected layout segment is the first part of the pathname
  const selectedLayout = location.pathname.split('/')[1]
  const locationArr = location.pathname.split('/')
  const beforeLocation = locationArr[locationArr.length - 2]
    .split('-')
    .join(' ')

  // handle logout
  const navigate = useNavigate()

  // handleLogout
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/web/logout`,
        {}, // Empty body for POST request
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )

      // logs
      console.log('Logged out successfully:', response.data)

      // Clear token from local storage
      localStorage.removeItem('usertype')

      // navigate to login
      navigate('/')
    } catch (error) {
      // logs
      console.error('Error creating client:', error)
    }
  }

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all shadow`,
        {
          ' bg-white/75 backdrop-blur-lg': scrolled,
          ' bg-white': selectedLayout,
        }
      )}>
      <div className="flex h-[80px] items-center justify-between px-10">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex flex-row items-center justify-center space-x-3 lg:hidden">
            <span className="flex text-xl font-bold">Lomina</span>
          </Link>
        </div>

        <div className="items-center justify-between hidden w-full lg:flex">
          <span className="text-xl font-semibold capitalize text-primaryBlue">
            {!Number.isInteger(parseInt(nameRoute, 10))
              ? decodeURIComponent(nameRoute).split('-').join(' ')
              : beforeLocation}
          </span>

          <div className="flex items-center gap-8">
            {/* notifications */}
            <Link to="/dashboard/notifications" className="relative w-9">
              <span className="w-[10px] h-[10px] right-1 top-1 rounded-full bg-errorColor absolute" />
              <BellIcon
                className={`w-10 p-2 rounded-full cursor-pointer hover:stroke-white hover:bg-primaryBlue  ${nameRoute === 'Notifications' ? 'stroke-white bg-primaryBlue' : 'bg-[#F8F9FA] stroke-primaryBlue'}`}
              />
            </Link>
            {/* avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img
                  className="w-11 h-11 object-cover rounded-full border-2 border-[#96ABFF] "
                  src="#"
                  alt="user-avatar"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-3 mt-2 mr-6">
                {/* Logout */}
                <DropdownMenuItem
                  onClick={() => handleLogout()}
                  className="flex items-center cursor-pointer gap-x-5 font-robotoMedium text-primaryblack">
                  <ArrowLeftEndOnRectangleIcon className="w-5" /> Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
