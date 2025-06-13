import { createContext, use } from 'react'

export interface FormContextType {
  wideNavbar: boolean
  setWideNavbar: React.Dispatch<React.SetStateAction<boolean>>
}

export const FormContext = createContext<FormContextType | undefined>(undefined)

export const useDashboardContext = () => {
  const context = use(FormContext)
  if (!context) {
    throw new Error(
      'useDashboardContext must be used within a DashboardProvider'
    )
  }
  return context
}
