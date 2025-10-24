import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Bell, Check, CheckCheck, Trash2 } from 'lucide-react'

interface Notification {
  id: string
  title: string
  message: string
  read?: boolean
  createdAt: string
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

  function timeAgo(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((+now - +date) / 1000)

    const rtf = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' })

    // 👇 On définit un type restreint
    type TimeUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'

    const ranges: Record<TimeUnit, number> = {
      year: 3600 * 24 * 365,
      month: 3600 * 24 * 30,
      day: 3600 * 24,
      hour: 3600,
      minute: 60,
      second: 1,
    }

    for (const key of Object.keys(ranges) as TimeUnit[]) {
      if (seconds >= ranges[key] || key === 'second') {
        const value = Math.floor(seconds / ranges[key])
        return rtf.format(-value, key)
      }
    }

    return ''
  }

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
      <DropdownMenuTrigger className="rounded-xl">
        <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-slate-100 to-slate-100 hover:from-blue-50 hover:to-indigo-50 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-200">
          <Bell className="w-5 h-5 text-slate-700 group-hover:text-blue-600 transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-pink-500 text-white font-semibold shadow-lg">
              {unreadCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-0 mr-4 mt-5 rounded-2xl ">
        <div className="rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold text-lg">
                  Notifications
                </h3>
                <p className="text-blue-100 text-sm">
                  {unreadCount > 0
                    ? `${unreadCount} non lue${unreadCount > 1 ? 's' : ''}`
                    : 'Tout est lu !'}
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-colors backdrop-blur-sm">
                  <CheckCheck className="w-4 h-4" />
                  Tout marquer
                </button>
              )}
            </div>
          </div>

          <div className="max-h-[400px]  w-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <Bell className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 text-sm font-medium">
                  Aucune notification
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Vous êtes à jour !
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`group relative px-5 py-4 hover:bg-slate-50 transition-colors ${
                      !notification.read ? 'bg-blue-200/50' : ''
                    }`}>
                    <div className="flex gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-[13px] flex items-center gap-2 font-semibold text-slate-900">
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            )}
                            {notification.title}
                          </h4>
                          <span className="text-xs text-slate-400 flex-shrink-0">
                            {timeAgo(notification.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {notification.message}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 ml-2">
                        {!notification.read && (
                          <button
                            type="button"
                            onClick={() => markAsRead(notification.id)}
                            className="flex-shrink-0 p-2 hover:bg-blue-100 rounded-lg transition-colors group/btn"
                            title="Marquer comme lu">
                            <Check className="w-4 h-4 text-slate-400 group-hover/btn:text-blue-600" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => deleteNotification(notification.id)}
                          className="flex-shrink-0 p-2 hover:bg-red-100 rounded-lg transition-colors group/btn"
                          title="Supprimer">
                          <Trash2 className="w-4 h-4 text-slate-400 group-hover/btn:text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
