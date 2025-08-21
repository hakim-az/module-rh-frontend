import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_API_BASE_URL)

export function useNotifications() {
  const [notifications, setNotifications] = useState<string[]>([])

  useEffect(() => {
    socket.on('notification', (data: { userId: string; message: string }) => {
      setNotifications((prev) => [...prev, data.message])
    })

    return () => {
      socket.off('notification')
    }
  }, [])

  return notifications
}
