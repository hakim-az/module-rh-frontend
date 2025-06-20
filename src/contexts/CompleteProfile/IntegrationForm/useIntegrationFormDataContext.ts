import { use } from 'react'
import { IntegrationFormContext } from './IntegrationFormContext'

export const useIntegrationFormDataContext = () => {
  const context = use(IntegrationFormContext)
  if (!context) {
    throw new Error(
      'IntegrationFormContext must be used within a IntegrationFormProvider'
    )
  }
  return context
}
