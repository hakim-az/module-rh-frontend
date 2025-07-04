import IntegrationFormProvider from '@/contexts/CompleteProfile/IntegrationForm/IntegrationFormProvider'
import type { UserStatus } from '../Employee'
import Step1 from './Step1/Step1'
import Step2 from './Step2/Step2'
import Step3 from './Step3/Step3'
import Step4 from './Step4/Step4'

interface IProps {
  userStatus: UserStatus
}

export default function CompleteProfile({ userStatus }: IProps) {
  if (userStatus === 'step-1') {
    return (
      <IntegrationFormProvider>
        <Step1 />
      </IntegrationFormProvider>
    )
  }

  if (userStatus === 'step-2') {
    return <Step2 />
  }

  if (userStatus === 'step-3') {
    return <Step3 />
  }

  if (userStatus === 'step-4') {
    return <Step4 />
  }
}
