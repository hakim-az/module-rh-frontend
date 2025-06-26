import { useState } from 'react'

// components
import Stepper from '../components/Stepper/Stepper'
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import ValidateIntegrationModal from '../components/Modals/ValidateIntegrationModal/ValidateIntegrationModal'
import PagePath from '@/components/PagePath/PagePath'
import InfosPerso from './InfosPerso/InfosPerso'
import InfosPro from './InfosPro/InfosPro'
import Justificatifs from './Justificatifs/Justificatifs'
import Contrat from './Contrat/Contrat'

// types
export interface Step {
  label: string
  status: 'done' | 'current' | 'upcoming'
}

export default function Step2() {
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
            setCurrentStepIndex={setCurrentStepIndex}
            setActiveValidateIntegrationModal={
              setActiveValidateIntegrationModal
            }
            labels={labels}
          />
        )
      case 1:
        return (
          <InfosPro
            currentStepIndex={currentStepIndex}
            setCurrentStepIndex={setCurrentStepIndex}
            setActiveValidateIntegrationModal={
              setActiveValidateIntegrationModal
            }
            labels={labels}
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
            setCurrentStepIndex={setCurrentStepIndex}
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
      <div className="p-4 w-11/12 mx-auto pb-20 max-w-[1200px]">
        <span className="inline-block text-center w-full mb-10 text-xl font-semibold">
          02 - Ajouter Contrat
        </span>
        <Stepper steps={steps} />
        <div className="w-full mx-auto py-20">{renderForm()}</div>
      </div>
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
