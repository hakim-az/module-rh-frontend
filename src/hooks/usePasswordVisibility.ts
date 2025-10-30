import { useState, useRef, useEffect, useCallback } from 'react'
import axios from 'axios'

interface UsePasswordVisibilityOptions {
  userId?: string
  duration?: number
  onError?: (message: string) => void
}

export function usePasswordVisibility({
  userId,
  duration = 30,
  onError,
}: UsePasswordVisibilityOptions) {
  const [isVisible, setIsVisible] = useState(false)
  const [password, setPassword] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [progress, setProgress] = useState(0)
  const countdownRef = useRef<number | null>(null)

  const cleanup = useCallback(() => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
      countdownRef.current = null
    }
    setIsVisible(false)
    setPassword(null)
    setSecondsLeft(0)
    setProgress(0)
  }, [])

  const show = useCallback(async () => {
    if (!userId) {
      onError?.('Utilisateur introuvable')
      return
    }
    if (isVisible) return

    try {
      setIsLoading(true)
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user-emails/user/${userId}`
      )
      const fetchedPassword = res.data?.password

      if (!fetchedPassword) {
        throw new Error('Aucun mot de passe renvoyé')
      }

      setPassword(fetchedPassword)
      setIsVisible(true)
      setSecondsLeft(duration)
      setProgress(1)

      countdownRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            cleanup()
            return 0
          }
          return prev - 1
        })
        setProgress((prev) => Math.max(0, prev - 1 / duration))
      }, 1000)
    } catch (err) {
      console.error(err)
      onError?.('Impossible de récupérer le mot de passe')
    } finally {
      setIsLoading(false)
    }
  }, [userId, isVisible, duration, onError, cleanup])

  const hide = useCallback(() => {
    cleanup()
  }, [cleanup])

  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current)
      }
    }
  }, [])

  return {
    isVisible,
    password,
    isLoading,
    secondsLeft,
    progress,
    show,
    hide,
  }
}
