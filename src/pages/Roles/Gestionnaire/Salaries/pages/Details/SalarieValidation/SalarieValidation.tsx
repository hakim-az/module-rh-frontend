import { useState } from 'react'
import PagePath from '@/components/PagePath/PagePath'
import StepperDisplay from '../components/StepperDisplay/StepperDisplay'
import InfoPersoDispalyForm from '@/components/DisplayForms/InfoPersoDisplayForm/InfoPersoDisplayForm'
import InfoProDisplayForm from '@/components/DisplayForms/InfoProDisplayForm/InfoProDisplayForm'
import JustificatifsDisplayForm from '@/components/DisplayForms/JustificatifsDisplayForm/JustificatifsDisplayForm'
import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'
import ContractDispalyForm from '@/components/DisplayForms/ContractDispalyForm/ContractDispalyForm'

type IProps = {
  statusLabel: React.ReactNode
}

// types
export interface Step {
  label: string
  status: 'done' | 'current' | 'upcoming'
}

export default function SalarieValidation({ statusLabel }: IProps) {
  const { salarieDetails, isLoadingSalarieDetails } = useSalarieDetailsContext()
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
          <InfoPersoDispalyForm
            details={salarieDetails}
            loading={isLoadingSalarieDetails}
          />
        )
      case 1:
        return (
          <InfoProDisplayForm
            details={salarieDetails}
            loading={isLoadingSalarieDetails}
          />
        )
      case 2:
        return (
          <JustificatifsDisplayForm
            details={salarieDetails}
            loading={isLoadingSalarieDetails}
          />
        )
      case 3:
        return (
          <section className="w-full mx-auto gap-10 flex flex-col ">
            <ContractDispalyForm
              details={salarieDetails}
              loading={isLoadingSalarieDetails}
            />
          </section>
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

        <StepperDisplay
          steps={steps}
          setCurrentStepIndex={setCurrentStepIndex}
          currentStepIndex={currentStepIndex}
        />

        <div className="w-full mx-auto py-20">{renderForm()}</div>
      </div>
    </>
  )
}
