import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Bell } from 'lucide-react'
import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { cn } from '@/lib/utils'

interface Notification {
  id: string
  title: string
  message: string
  read?: boolean
}

export default function NotificationBell() {
  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  const { userDetails } = useDashboardContext()

  const queryClient = useQueryClient()

  //Fetch notifications using React Query
  const { data: notifications = [] } = useQuery<Notification[]>({
    queryKey: ['notifications', userDetails?.id],
    queryFn: async () => {
      if (!userDetails?.id) return []
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/notifications/user/${userDetails.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return res.data
    },
    enabled: !!userDetails?.id,
  })

  useEffect(() => {
    if (!userDetails?.id || !token) return

    const socket: Socket = io(import.meta.env.VITE_API_BASE_URL as string, {
      extraHeaders: { Authorization: `Bearer ${token}` },
    })

    socket.on('connect', () => {
      console.log('Connected to notifications socket')
      socket.emit('join', userDetails.id)
    })

    socket.on('notification', (notif: Notification) => {
      console.log('New notification received', notif)
      queryClient.setQueryData<Notification[]>(
        ['notifications', userDetails.id],
        (old = []) => {
          const exists = old.find((n) => n.id === notif.id)
          return exists ? old : [notif, ...old]
        }
      )
    })

    return () => {
      socket.disconnect()
    }
  }, [queryClient, userDetails?.id, token])
  // Mark a single notification as read
  const markAsRead = async (id: string) => {
    await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/notifications/${id}/read`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    queryClient.setQueryData<Notification[]>(
      ['notifications', userDetails?.id],
      (old = []) => old.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (!userDetails?.id) return
    await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/notifications/user/${userDetails.id}/read-all`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    queryClient.setQueryData<Notification[]>(
      ['notifications', userDetails?.id],
      (old = []) => old.map((n) => ({ ...n, read: true }))
    )
  }

  // Delete a notification
  const deleteNotification = async (id: string) => {
    await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/notifications/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    queryClient.setQueryData<Notification[]>(
      ['notifications', userDetails?.id],
      (old = []) => old.filter((n) => n.id !== id)
    )
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative">
          <Bell className="text-gray-700 hover:bg-gray-300 bg-blue-50 shadow-md w-10 h-10 p-2 rounded-full hover:text-coral-500 transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] flex items-center justify-center rounded-full bg-[#FF6B6B] text-white font-semibold">
              {unreadCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[350px] max-h-[300px] p-3 mt-2 shadow-lg rounded-xl bg-white border border-gray-200">
        {notifications.length === 0 ? (
          <span className="text-sm text-gray-500">Aucune notification</span>
        ) : (
          <>
            {/* Action buttons */}
            <div className="flex justify-between items-center px-2 py-1 border-b border-gray-200 mb-2">
              <span className="text-sm font-medium text-gray-700">
                Notifications
              </span>
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:underline">
                Tout marquer comme lu
              </button>
            </div>

            {/* Notifications list */}
            {notifications.map((n) => (
              <DropdownMenuItem
                key={n.id}
                className={cn(
                  'flex justify-between items-start mb-1 gap-2 p-3 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors',
                  { 'bg-blue-100': !n.read }
                )}>
                <div
                  className="flex flex-col flex-1"
                  onClick={() => markAsRead(n.id)}>
                  <span className="font-medium text-gray-800">{n.title}</span>
                  <span className="text-sm text-gray-600">{n.message}</span>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {/* Delete icon */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNotification(n.id)
                    }}
                    className="text-gray-400 hover:text-[#FF6B6B] transition-colors">
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
