import { Link, useLocation } from 'react-router-dom'
import useScroll from '@/hooks/useScroll/useScroll'
import { cn } from '@/lib/utils'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { CircleUserRound } from 'lucide-react'
import { useAuth } from '@/contexts/KeyCloakContext/useAuth'
// import { useEffect } from 'react'
// import { io, Socket } from 'socket.io-client'
// import { useQuery, useQueryClient } from '@tanstack/react-query'
// import axios from 'axios'

interface PropsType {
  nameRoute: string
}

// interface Notification {
//   id: string
//   title: string
//   message: string
//   read?: boolean
// }

function Header({ nameRoute }: PropsType) {
  const { userDetails } = useDashboardContext()
  const { logout } = useAuth()
  const scrolled = useScroll(5)
  const location = useLocation()
  // const queryClient = useQueryClient()

  // Fetch notifications using React Query
  // const { data: notifications = [] } = useQuery<Notification[]>({
  //   queryKey: ['notifications', userDetails?.id],
  //   queryFn: async () => {
  //     if (!userDetails?.id) return []
  //     const res = await axios.get(
  //       `${import.meta.env.VITE_API_BASE_URL}/notifications/${userDetails.id}`
  //     )
  //     return res.data
  //   },
  //   enabled: !!userDetails?.id,
  // })

  // useEffect(() => {
  //   if (!userDetails?.id) return

  //   const socket: Socket = io('${import.meta.env.VITE_API_BASE_URL}')

  //   socket.on('connect', () => {
  //     console.log('Connected to notifications socket')
  //     socket.emit('join', userDetails.id) // join user-specific room
  //   })

  //   socket.on('notification', (notif: Notification) => {
  //     console.log('New notification received', notif)
  //     queryClient.setQueryData<Notification[]>(
  //       ['notifications', userDetails.id],
  //       (old = []) => [notif, ...old]
  //     )
  //   })

  //   return () => {
  //     socket.disconnect()
  //   }
  // }, [queryClient, userDetails?.id])

  // Mark a notification as read
  // const markAsRead = async (id: string) => {
  //   await axios.patch(
  //     `${import.meta.env.VITE_API_BASE_URL}/notifications/${id}/read`
  //   )
  //   queryClient.setQueryData<Notification[]>(
  //     ['notifications', userDetails?.id],
  //     (old = []) => old.map((n) => (n.id === id ? { ...n, read: true } : n))
  //   )
  // }

  // const unreadCount = notifications.filter((n) => !n.read).length

  const selectedLayout = location.pathname.split('/')[1]
  const locationArr = location.pathname.split('/')
  const beforeLocation = locationArr[locationArr.length - 2]
    .split('-')
    .join(' ')

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all shadow`,
        {
          'bg-white/75 backdrop-blur-lg': scrolled,
          'bg-white': selectedLayout,
        }
      )}>
      <div className="flex h-[80px] items-center justify-between px-6">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex flex-row items-center justify-center space-x-3 lg:hidden">
            <span className="flex text-xl font-bold">Module RH</span>
          </Link>
        </div>

        <div className="items-center justify-between hidden w-full lg:flex">
          <span className="text-xl font-semibold capitalize text-primaryBlue">
            {!Number.isInteger(parseInt(nameRoute, 10))
              ? decodeURIComponent(nameRoute).split('-').join(' ')
              : beforeLocation}
          </span>

          {/* Notifications Dropdown */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="relative">
                <Bell className="text-red-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center rounded-full bg-red-600 text-white">
                    {unreadCount}
                  </span>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-2 mt-2">
              {notifications.length === 0 ? (
                <span className="text-sm text-gray-500">No notifications</span>
              ) : (
                notifications.map((n) => (
                  <DropdownMenuItem
                    key={n.id}
                    className={cn('flex flex-col gap-1 p-2 cursor-pointer', {
                      'bg-gray-100': !n.read,
                    })}
                    onClick={() => markAsRead(n.id)}>
                    <span className="font-medium">{n.title}</span>
                    <span className="text-sm text-gray-600">{n.message}</span>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu> */}

          <div className="flex items-center gap-8">
            {/* User Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                {userDetails?.avatar === '' ? (
                  <CircleUserRound width={40} height={40} />
                ) : (
                  <img
                    src={userDetails?.avatar}
                    alt="user-avatar"
                    className="w-11 h-11 object-cover rounded-full border-2 border-[#96ABFF]"
                  />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-3 mt-2 mr-6">
                <DropdownMenuItem
                  onClick={logout}
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
