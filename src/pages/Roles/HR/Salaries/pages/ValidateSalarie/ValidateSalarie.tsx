import { useState } from 'react'

// components
import Stepper from './components/Stepper/Stepper'
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import IntegrateSalarieModel from './components/Modals/IntegrateSalarieModel'

import PagePath from '@/components/PagePath/PagePath'
import InfosPerso from './StepperForms/InfosPerso/InfosPerso'
import InfosPro from './StepperForms/InfosPro/InfosPro'
import Justificatifs from './StepperForms/Justificatifs/Justificatifs'
import Contrat from './StepperForms/Contrat/Contrat'

// types
export interface Step {
  label: string
  status: 'done' | 'current' | 'upcoming'
}

export default function ValidateSalarie() {
  // states
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [activeValidateSalarieModal, setActiveValidateSalarieModal] =
    useState<boolean>(false)

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
        return <InfosPerso />
      case 1:
        return <InfosPro />
      case 2:
        return <Justificatifs />
      case 3:
        return (
          <Contrat
            setActiveValidateSalarieModal={setActiveValidateSalarieModal}
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
        <CustomModal
          openModal={activeValidateSalarieModal}
          setOpenModal={setActiveValidateSalarieModal}>
          <IntegrateSalarieModel
            setActiveValidateSalarieModal={setActiveValidateSalarieModal}
          />
        </CustomModal>

        <Stepper
          steps={steps}
          setCurrentStepIndex={setCurrentStepIndex}
          currentStepIndex={currentStepIndex}
        />

        {/* ⬇️ Form */}
        <div className="w-full mx-auto py-20">{renderForm()}</div>
      </div>
    </>
  )
}
