import { useState } from 'react'
import StepperDispaly from '../components/StepperDisplay/StepperDisplay'
import InfoPersoDispalyForm from '@/components/DisplayForms/InfoPersoDisplayForm/InfoPersoDisplayForm'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import InfoProDisplayForm from '@/components/DisplayForms/InfoProDisplayForm/InfoProDisplayForm'
import JustificatifsDisplayForm from '@/components/DisplayForms/JustificatifsDisplayForm/JustificatifsDisplayForm'

// types
export interface Step {
  label: string
  status: 'done' | 'current' | 'upcoming'
}

export default function WaitContract() {
  const { userDetails, isLoadingUser } = useDashboardContext()
  // states
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // consts
  const labels = [
    'Informations personnelles',
    'Informations professionnelles',
    'Pièces justificatives',
  ]

  const steps: Step[] = labels.map((label, index) => {
    let status: Step['status']
    if (index < currentStepIndex) status = 'done'
    else if (index === currentStepIndex) status = 'current'
    else status = 'upcoming'
    return { label, status }
  })

  // Form Component Selector
  const renderForm = () => {
    switch (currentStepIndex) {
      case 0:
        return (
          <InfoPersoDispalyForm loading={isLoadingUser} details={userDetails} />
        )
      case 1:
        return (
          <InfoProDisplayForm loading={isLoadingUser} details={userDetails} />
        )
      case 2:
        return (
          <JustificatifsDisplayForm
            loading={isLoadingUser}
            details={userDetails}
          />
        )
      default:
        return null
    }
  }
  return (
    <>
      <StepperDispaly
        steps={steps}
        setCurrentStepIndex={setCurrentStepIndex}
        currentStepIndex={currentStepIndex}
      />

      <div className="w-11/12 max-w-[1280px] mx-auto py-20">{renderForm()}</div>
    </>
  )
}
