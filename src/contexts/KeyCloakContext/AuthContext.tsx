import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { AuthUser } from '@/types/auth'
import { keycloakService } from '@/services/keycloak'
import { jwtDecode } from 'jwt-decode'

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  signup: (userData: {
    username: string
    firstName: string
    lastName: string
    telephonePersonnel: string
    email: string
    password: string
  }) => Promise<void>
  logout: () => void
}

interface DecodedToken {
  sub: string
  preferred_username?: string
  email?: string
  given_name?: string
  family_name?: string
  [key: string]: unknown // optional fallback
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch {
        localStorage.removeItem('auth_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
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
    localStorage.setItem('auth_user', JSON.stringify(authUser))
    localStorage.setItem('userId', authUser.id)
    localStorage.setItem('userRole', 'employee')

    setTimeout(
      () => {
        refreshUserToken(authUser.refreshToken)
      },
      (response.expires_in - 60) * 1000
    )
  }

  const signup = async (userData: {
    username: string
    firstName: string
    lastName: string
    telephonePersonnel: string
    email: string
    password: string
  }) => {
    await keycloakService.signup({
      ...userData,
      avatar: '', // optional, can be customized
      role: 'employee', // optional
      statut: 'user-registred', // optional
    })
  }

  const refreshUserToken = async (refreshToken: string) => {
    try {
      const response = await keycloakService.refreshToken(refreshToken)

      if (user) {
        const updatedUser = {
          ...user,
          token: response.access_token,
          refreshToken: response.refresh_token,
        }

        setUser(updatedUser)
        localStorage.setItem('auth_user', JSON.stringify(updatedUser))

        setTimeout(
          () => {
            refreshUserToken(updatedUser.refreshToken)
          },
          (response.expires_in - 60) * 1000
        )
      }
    } catch {
      logout()
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
    window.location.href = 'http://localhost:5173/'
  }

  // eslint-disable-next-line react-x/no-unstable-context-value
  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
  }

  return <AuthContext value={value}>{children}</AuthContext>
}
