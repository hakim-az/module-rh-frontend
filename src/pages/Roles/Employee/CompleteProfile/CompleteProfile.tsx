import Step2 from './Step2/Step2'
import Step3 from './Step3/Step3'
import Step4 from './Step4/Step4'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'

export default function CompleteProfile() {
  const { userDetails } = useDashboardContext()

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
