import { useState } from 'react'

// components
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import IntegrateSalarieModel from '../components/Modals/IntegrateSalarieModel/IntegrateSalarieModel'

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
            {/* validation button */}
            {salarieDetails?.statut === 'contract-signed' && (
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setActiveValidateSalarieModal(true)}
                  className="mb-5 mr-5 flex items-center justify-center gap-3 hover:scale-110 transition-all ease delay-75 cursor-pointer bg-green-500 text-white px-8 py-2 rounded">
                  Approuver le salarié
                </button>
              </div>
            )}
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
      <CustomModal
        openModal={activeValidateSalarieModal}
        setOpenModal={setActiveValidateSalarieModal}>
        <IntegrateSalarieModel
          setActiveValidateSalarieModal={setActiveValidateSalarieModal}
        />
      </CustomModal>
    </>
  )
}
