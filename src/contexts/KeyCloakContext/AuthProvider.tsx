// src/contexts/AuthContext/AuthProvider.tsx
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'
import type { AuthUser } from '@/types/auth'
import { keycloakService } from '@/services/keycloak'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from './AuthContext'

interface AuthProviderProps {
  children: ReactNode
}

interface DecodedToken {
  sub: string
  preferred_username?: string
  email?: string
  given_name?: string
  family_name?: string
  [key: string]: unknown
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const refreshTimeoutId = useRef<NodeJS.Timeout | null>(null)

  // Ref to hold latest refreshUserToken function to avoid circular deps
  const refreshUserTokenRef = useRef<
    ((refreshToken: string) => Promise<void>) | undefined
  >(undefined)

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (refreshTimeoutId.current) clearTimeout(refreshTimeoutId.current)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    sessionStorage.removeItem('auth_user')
    if (refreshTimeoutId.current) clearTimeout(refreshTimeoutId.current)
    window.location.href = '/' // Adjust redirect URL if needed
  }, [])

  // scheduleTokenRefresh: schedules token refresh 60s before expiry
  const scheduleTokenRefresh = useCallback(
    (expiresInSeconds: number, refreshToken: string) => {
      if (refreshTimeoutId.current) clearTimeout(refreshTimeoutId.current)

      refreshTimeoutId.current = setTimeout(
        () => {
          if (refreshUserTokenRef.current) {
            refreshUserTokenRef.current(refreshToken)
          }
        },
        (expiresInSeconds - 60) * 1000
      )
    },
    []
  )

  const refreshUserToken = useCallback(
    async (refreshToken: string) => {
      try {
        const response = await keycloakService.refreshToken(refreshToken)

        setUser((currentUser) => {
          if (!currentUser) {
            logout()
            return null
          }

          const updatedUser = {
            ...currentUser,
            token: response.access_token,
            refreshToken: response.refresh_token,
          }
          sessionStorage.setItem('auth_user', JSON.stringify(updatedUser))

          scheduleTokenRefresh(response.expires_in, updatedUser.refreshToken)
          return updatedUser
        })
      } catch {
        logout()
      }
    },
    [logout, scheduleTokenRefresh]
  )

  // Keep the ref updated with the latest refreshUserToken function
  useEffect(() => {
    refreshUserTokenRef.current = refreshUserToken
  }, [refreshUserToken])

  // Load stored user on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem('auth_user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)

        if (parsedUser?.refreshToken) {
          // Optionally decode token expiry here, else fallback 300s
          scheduleTokenRefresh(300, parsedUser.refreshToken)
        }
      } catch {
        sessionStorage.removeItem('auth_user')
      }
    }
    setIsLoading(false)
  }, [scheduleTokenRefresh])

  const login = useCallback(
    async (username: string, password: string) => {
      const response = await keycloakService.login(username, password)

      const decodedToken = jwtDecode<DecodedToken>(response.access_token)
      const authUser: AuthUser = {
        id: decodedToken.sub,
        username: decodedToken.preferred_username || username,
        email: decodedToken.email || '',
        firstName: decodedToken.given_name || '',
        lastName: decodedToken.family_name || '',
        token: response.access_token,
        refreshToken: response.refresh_token,
      }

      setUser(authUser)
      sessionStorage.setItem('auth_user', JSON.stringify(authUser))

      scheduleTokenRefresh(response.expires_in, authUser.refreshToken)
    },
    [scheduleTokenRefresh]
  )

  const signup = useCallback(
    async (userData: {
      username: string
      firstName: string
      lastName: string
      telephonePersonnel: string
      email: string
      password: string
    }) => {
      await keycloakService.signup({
        ...userData,
        avatar: '',
        role: 'employee',
        statut: 'user-registred',
      })
    },
    []
  )

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      signup,
      logout,
    }),
    [user, isLoading, login, signup, logout]
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
