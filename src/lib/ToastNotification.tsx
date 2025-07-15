import { ToastContainer, type ToastOptions, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ToastNotificationProps {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  options?: ToastOptions
}

// eslint-disable-next-line react-refresh/only-export-components
export const notify = ({
  message,
  type = 'success',
  options = {},
}: ToastNotificationProps) => {
  const toastOptions: ToastOptions = {
    ...options,
    onClose: () => {},
    autoClose: 2000,
  }

  switch (type) {
    case 'success':
      toast.success(message, toastOptions)
      break
    case 'error':
      toast.error(message, toastOptions)
      break
    case 'info':
      toast.info(message, toastOptions)
      break
    case 'warning':
      toast.warn(message, toastOptions)
      break
    default:
      toast(message, toastOptions)
  }
}

// ToastNotification component for setting up ToastContainer

function ToastNotification() {
  return (
    <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
  )
}

export default ToastNotification
