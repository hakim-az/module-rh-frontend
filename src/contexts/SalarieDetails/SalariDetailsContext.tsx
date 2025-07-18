import type { User } from '@/types/user.types'
import { createContext, use } from 'react'

export interface FormContextType {
  isLoadingSalarieDetails: boolean
  salarieDetails: User | undefined
  setUserId: (id: string) => void
}

export const FormContext = createContext<FormContextType | undefined>(undefined)

export const useSalarieDetailsContext = () => {
  const context = use(FormContext)
  if (!context) {
    throw new Error(
      'useSalarieDetailsContext must be used within SalarieDetailsProvider'
    )
  }
  return context
}
