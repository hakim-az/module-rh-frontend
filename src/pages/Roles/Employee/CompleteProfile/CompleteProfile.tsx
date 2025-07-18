import IntegrationFormProvider from '@/contexts/CompleteProfile/IntegrationForm/IntegrationFormProvider'
import Step1 from './Step1/Step1'
import Step2 from './Step2/Step2'
import Step3 from './Step3/Step3'
import Step4 from './Step4/Step4'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'

export default function CompleteProfile() {
  const { userDetails, userStatus } = useDashboardContext()
  if (userStatus === 'user-created') {
    return (
      <IntegrationFormProvider>
        <Step1 />
      </IntegrationFormProvider>
    )
  }

  if (userDetails?.statut === 'profile-completed') {
    return <Step2 />
  }

  if (
    userDetails?.statut === 'contract-uploaded' ||
    userDetails?.statut === 'email-sent'
  ) {
    return <Step3 />
  }

  if (userDetails?.statut === 'contract-signed') {
    return <Step4 />
  }
}
