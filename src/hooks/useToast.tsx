/* eslint-disable react-refresh/only-export-components */
import { useState, useCallback, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { CheckCircle2, XCircle, X } from 'lucide-react'

type ToastType = 'success' | 'error'

interface Toast {
  id: string
  message: string
  type: ToastType
}

let toasts: Toast[] = []
let listeners: Array<(toasts: Toast[]) => void> = []

function notifyListeners() {
  listeners.forEach((listener) => listener([...toasts]))
}

function addToast(message: string, type: ToastType) {
  const id = Math.random().toString(36).substr(2, 9)
  toasts.push({ id, message, type })
  notifyListeners()

  setTimeout(() => {
    removeToast(id)
  }, 4000)

  return id
}

function removeToast(id: string) {
  toasts = toasts.filter((toast) => toast.id !== id)
  notifyListeners()
}

export function useToast() {
  const showToast = useCallback(
    (message: string, type: ToastType = 'success') => {
      addToast(message, type)
    },
    []
  )

  return { showToast }
}

export function ToastContainer() {
  const [toastList, setToastList] = useState<Toast[]>([])

  useEffect(() => {
    listeners.push(setToastList)
    return () => {
      listeners = listeners.filter((listener) => listener !== setToastList)
    }
  }, [])

  if (toastList.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toastList.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  )
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast
  onRemove: (id: string) => void
}) {
  const isSuccess = toast.type === 'success'

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg
        pointer-events-auto animate-in slide-in-from-right duration-300
        ${isSuccess ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}
      `}>
      {isSuccess ? (
        <CheckCircle2 size={20} className="text-green-600 flex-shrink-0" />
      ) : (
        <XCircle size={20} className="text-red-600 flex-shrink-0" />
      )}
      <p
        className={`text-sm font-medium ${isSuccess ? 'text-green-800' : 'text-red-800'}`}>
        {toast.message}
      </p>
      <button
        type="button"
        onClick={() => onRemove(toast.id)}
        className={`ml-2 p-1 rounded hover:bg-white/50 transition-colors ${
          isSuccess ? 'text-green-600' : 'text-red-600'
        }`}>
        <X size={16} />
      </button>
    </div>
  )
}

if (typeof window !== 'undefined') {
  const toastRoot = document.createElement('div')
  toastRoot.id = 'toast-root'
  document.body.appendChild(toastRoot)
  const root = createRoot(toastRoot)
  root.render(<ToastContainer />)
}
