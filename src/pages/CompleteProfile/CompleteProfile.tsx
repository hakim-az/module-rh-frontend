import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import SignContract from './SignContract/SignContract'
import Pending from './Pending/Pending'

export default function CompleteProfile() {
  const { userDetails } = useDashboardContext()

  if (
    userDetails?.statut === 'profile-completed' ||
    userDetails?.statut === 'contract-signed'
  ) {
    return <Pending />
  }

  if (
    userDetails?.statut === 'contract-uploaded' ||
    userDetails?.statut === 'email-sent'
  ) {
    return <SignContract />
  }
}
