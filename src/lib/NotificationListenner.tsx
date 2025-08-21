import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { notify } from '@/lib/ToastNotification'

const socket = io(import.meta.env.VITE_API_BASE_URL) // backend

export default function NotificationListener() {
  useEffect(() => {
    socket.on('notification', (data: { userId: string; message: string }) => {
      notify({
        message: data.message,
        type: 'success',
      })
    })

    return () => {
      socket.off('notification')
    }
  }, [])

  return null // pas d'affichage direct
}
