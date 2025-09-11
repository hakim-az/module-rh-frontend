import { useState } from 'react'

// components
import Stepper from './components/Stepper/Stepper'
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import ValidateIntegrationModal from './components/Modals/ValidateIntegrationModal'
import InfosPerso from './Pages/InfosPerso/InfosPerso'
import InfosPro from './Pages/InfosPro/InfosPro'
import Justificatifs from './Pages/Justificatifs/Justificatifs'
import PagePath from '@/components/PagePath/PagePath'
import Contrat from './Pages/Contrat/Contrat'

// types
export interface Step {
  label: string
  status: 'done' | 'current' | 'upcoming'
}

export default function IntegrationForm() {
  // states
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [activeValidateIntegrationModal, setActiveValidateIntegrationModal] =
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

  // handle go next
  const goNext = () => {
    if (currentStepIndex < labels.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  // handle go back
  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  // Form Component Selector
  const renderForm = () => {
    switch (currentStepIndex) {
      case 0:
        return (
          <InfosPerso
            currentStepIndex={currentStepIndex}
            setActiveValidateIntegrationModal={
              setActiveValidateIntegrationModal
            }
            labels={labels}
            goNext={goNext}
            goBack={goBack}
          />
        )
      case 1:
        return (
          <InfosPro
            currentStepIndex={currentStepIndex}
            setActiveValidateIntegrationModal={
              setActiveValidateIntegrationModal
            }
            labels={labels}
            goNext={goNext}
            goBack={goBack}
          />
        )
      case 2:
        return (
          <Justificatifs
            currentStepIndex={currentStepIndex}
            setActiveValidateIntegrationModal={
              setActiveValidateIntegrationModal
            }
            labels={labels}
            goNext={goNext}
            goBack={goBack}
          />
        )
      case 3:
        return (
          <Contrat
            currentStepIndex={currentStepIndex}
            setActiveValidateIntegrationModal={
              setActiveValidateIntegrationModal
            }
            labels={labels}
            goNext={goNext}
            goBack={goBack}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <PagePath />
      <Stepper steps={steps} />
      <div className="w-11/12 max-w-[1280px] mx-auto py-20">{renderForm()}</div>
      <CustomModal
        openModal={activeValidateIntegrationModal}
        setOpenModal={setActiveValidateIntegrationModal}>
        <ValidateIntegrationModal
          setActiveValidateIntegrationModal={setActiveValidateIntegrationModal}
        />
      </CustomModal>
    </>
  )
}
