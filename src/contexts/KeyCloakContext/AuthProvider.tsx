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
import { useNavigate } from 'react-router-dom'

interface AuthProviderProps {
  children: ReactNode
}

interface DecodedToken {
  sub: string
  preferred_username?: string
  email?: string
  given_name?: string
  family_name?: string
  exp?: number
  [key: string]: unknown
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const refreshTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)
  const refreshUserTokenRef = useRef<
    ((refreshToken: string) => Promise<void>) | undefined
  >(undefined)

  const clearRefreshTimeout = () => {
    if (refreshTimeoutId.current) {
      clearTimeout(refreshTimeoutId.current)
      refreshTimeoutId.current = null
    }
  }

  const logout = useCallback(() => {
    setUser(null)
    sessionStorage.removeItem('auth_user')
    clearRefreshTimeout()
    navigate('/') // ✅ client-side navigation, no reload
  }, [navigate])

  const scheduleTokenRefresh = useCallback(
    (expiresInSeconds: number, refreshToken: string) => {
      clearRefreshTimeout()

      const refreshInMs = (expiresInSeconds - 60) * 1000 // refresh 60s before expiry
      if (refreshInMs <= 0) return

      refreshTimeoutId.current = setTimeout(() => {
        if (refreshUserTokenRef.current) {
          refreshUserTokenRef.current(refreshToken)
        }
      }, refreshInMs)
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
      } catch (err) {
        console.error('Token refresh failed', err)
        logout()
      }
    },
    [logout, scheduleTokenRefresh]
  )

  useEffect(() => {
    refreshUserTokenRef.current = refreshUserToken
  }, [refreshUserToken])

  // Load stored user on mount (no token expiry validation)
  useEffect(() => {
    const storedUser = sessionStorage.getItem('auth_user')
    if (storedUser) {
      try {
        const parsedUser: AuthUser = JSON.parse(storedUser)
        setUser(parsedUser)
        scheduleTokenRefresh(300, parsedUser.refreshToken) // fallback 5min if unknown
      } catch {
        sessionStorage.removeItem('auth_user')
      }
    }
    setIsLoading(false)
  }, [scheduleTokenRefresh])

  const login = useCallback(
    async (username: string, password: string) => {
      const response = await keycloakService.login(username, password)

      const decodedToken = jwtDecode<
        DecodedToken & {
          realm_access?: { roles?: string[] }
          resource_access?: Record<string, { roles?: string[] }>
          scope?: string
          email_verified?: boolean
          name?: string
          groups?: string[]
        }
      >(response.access_token)

      const authUser: AuthUser = {
        id: decodedToken.sub,
        username: decodedToken.preferred_username || username,
        email: decodedToken.email || '',
        firstName: decodedToken.given_name || '',
        lastName: decodedToken.family_name || '',
        token: response.access_token,
        refreshToken: response.refresh_token,

        // New fields from token
        realmAccess: decodedToken.realm_access ?? { roles: [] },
        resourceAccess: decodedToken.resource_access ?? {},
        scope: decodedToken.scope ?? '',
        emailVerified: decodedToken.email_verified ?? false,
        fullName: decodedToken.name ?? '',
        groups: decodedToken.groups ?? [],
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
        statut: 'user-registered',
      })
    },
    []
  )

  /**
   * 🔒 Ban a user (disable login in Keycloak)
   */
  const banUser = useCallback(async (userId: string) => {
    await keycloakService.banUser(userId)
  }, [])

  /**
   * 🔓 Enable a user (allow login in Keycloak)
   */
  const enableUser = useCallback(async (userId: string) => {
    await keycloakService.enableUser(userId)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      signup,
      logout,
      banUser,
      enableUser,
    }),
    [user, isLoading, login, signup, logout, banUser, enableUser]
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
