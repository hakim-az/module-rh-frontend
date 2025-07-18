import { useState } from 'react'

// components
import Stepper from '../components/Stepper/Stepper'
import PagePath from '@/components/PagePath/PagePath'
import InfosPerso from './InfosPerso/InfosPerso'
import InfosPro from './InfosPro/InfosPro'
import Justificatifs from './Justificatifs/Justificatifs'
import Contrat from './Contrat/Contrat'

type IProps = {
  statusLabel: React.ReactNode
}

// types
export interface Step {
  label: string
  status: 'done' | 'current' | 'upcoming'
}

export default function Step2({ statusLabel }: IProps) {
  // states
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // consts
  const labels = [
    'Informations personnelles',
    'Informations professionnelles',
    'Pièces justificatives',
    'Informations contrat',
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
          <InfosPerso
            currentStepIndex={currentStepIndex}
            setCurrentStepIndex={setCurrentStepIndex}
            labels={labels}
          />
        )
      case 1:
        return (
          <InfosPro
            currentStepIndex={currentStepIndex}
            setCurrentStepIndex={setCurrentStepIndex}
            labels={labels}
          />
        )
      case 2:
        return (
          <Justificatifs
            currentStepIndex={currentStepIndex}
            setCurrentStepIndex={setCurrentStepIndex}
            labels={labels}
          />
        )
      case 3:
        return (
          <Contrat
            currentStepIndex={currentStepIndex}
            setCurrentStepIndex={setCurrentStepIndex}
            labels={labels}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <PagePath />
      <div className="p-4 w-11/12 mx-auto pb-20 max-w-[1200px]">
        {statusLabel}
        <Stepper steps={steps} />
        <div className="w-full mx-auto py-20">{renderForm()}</div>
      </div>
    </>
  )
}
