import { useState } from 'react'
import Stepper from '../../components/Stepper/Stepper'

// forms
import InfosPerso from './StepperForms/InfosPerso/InfosPerso'
import InfosPro from './StepperForms/InfosPro/InfosPro'
import Justificatifs from './StepperForms/Justificatifs/Justificatifs'
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import Header from '../../components/Header/Header'
import Banner from '../../components/Banner/Banner'
import ValidateIntegrationModal from '../components/ValidateIntegrationModal'

export interface Step {
  label: string
  status: 'done' | 'current' | 'upcoming'
}

const HookMultiStepForm = () => {
  const labels = [
    'Informations personnelles',
    'Informations professionnelles',
    'Pièces justificatives',
  ]

  const [currentStepIndex, setCurrentStepIndex] = useState(2)
  const [activeValidateIntegrationModal, setActiveValidateIntegrationModal] =
    useState<boolean>(false)

  const steps: Step[] = labels.map((label, index) => {
    let status: Step['status']
    if (index < currentStepIndex) status = 'done'
    else if (index === currentStepIndex) status = 'current'
    else status = 'upcoming'
    return { label, status }
  })
  const goNext = () => {
    if (currentStepIndex < labels.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  console.log(currentStepIndex)

  // 🔁 Form Component Selector
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
      default:
        return null
    }
  }

  return (
    <section className="w-full flex-col flex items-center justify-center ">
      <Header />
      <Banner
        title="Lorem ipsum dolor sit amet."
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel repellendus aspernatur minus quo odit sunt consequatur porro soluta tenetur molestiae necessitatibus consequuntur in dicta maxime voluptatibus, autem debitis dolore explicabo harum expedita! Consectetur alias nam accusantium numquam doloribus minus nihil incidunt dolores quis id repudiandae iusto quidem facere quam est cum atque repellat et tempora nostrum, quae voluptatum! Ex, porro inventore! Totam atque id, accusamus libero fugit quo distinctio sapiente!"
      />
      <div className="p-4 w-11/12 mx-auto pb-20 max-w-[1200px] ">
        <CustomModal
          openModal={activeValidateIntegrationModal}
          setOpenModal={setActiveValidateIntegrationModal}>
          <ValidateIntegrationModal
            setActiveValidateIntegrationModal={
              setActiveValidateIntegrationModal
            }
          />
        </CustomModal>
        <Stepper steps={steps} />

        {/* ⬇️ Form */}
        <div className="w-full mx-auto py-20">{renderForm()}</div>
      </div>
    </section>
  )
}

export default HookMultiStepForm
