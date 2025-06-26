import { useState } from 'react'
import Justificatifs from './components/Justificatifs/Justificatifs'
import InfoPerso from './components/InfoPerso/InfoPerso'
import InfoPro from './components/InfoPro/InfoPro'
import StepperDispaly from '../components/StepperDisplay/StepperDisplay'

// types
export interface Step {
  label: string
  status: 'done' | 'current' | 'upcoming'
}

export default function Step2() {
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
        return <InfoPerso />
      case 1:
        return <InfoPro />
      case 2:
        return <Justificatifs />
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
