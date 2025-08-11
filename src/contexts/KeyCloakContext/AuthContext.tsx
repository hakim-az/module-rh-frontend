import { createContext, use } from 'react'
import type { AuthUser } from '@/types/auth'

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

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = use(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
