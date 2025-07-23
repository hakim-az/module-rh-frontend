import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import WaitContract from './WaitContract/WaitContract'
import SignContract from './SignContract/SignContract'
import WaitValidation from './WaitValidation/WaitValidation'

export default function CompleteProfile() {
  const { userDetails } = useDashboardContext()

  if (userDetails?.statut === 'profile-completed') {
    return <WaitContract />
  }

  if (
    userDetails?.statut === 'contract-uploaded' ||
    userDetails?.statut === 'email-sent'
  ) {
    return <SignContract />
  }

  if (userDetails?.statut === 'contract-signed') {
    return <WaitValidation />
  }
}
