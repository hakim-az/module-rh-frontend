import { useState } from 'react'
import Banner from '../components/Banner/Banner'
import Header from '../components/Header/Header'
import Justificatifs from './components/Justificatifs/Justificatifs'
import InfoPerso from './components/InfoPerso/InfoPerso'
import Stepper from './components/Stepper/Stepper'
import InfoPro from './components/InfoPro/InfoPro'

// types
export interface Step {
  label: string
  status: 'done' | 'current' | 'upcoming'
}

export default function WaitContract() {
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
      <Header />
      <Banner
        title="02 - Signature du contrat"
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel repellendus aspernatur minus quo odit sunt consequatur porro soluta tenetur molestiae necessitatibus consequuntur in dicta maxime voluptatibus, autem debitis dolore explicabo harum expedita! Consectetur alias nam accusantium numquam doloribus minus nihil incidunt dolores quis id repudiandae iusto quidem facere quam est cum atque repellat et tempora nostrum, quae voluptatum! Ex, porro inventore! Totam atque id, accusamus libero fugit quo distinctio sapiente!"
      />
      <Stepper
        steps={steps}
        setCurrentStepIndex={setCurrentStepIndex}
        currentStepIndex={currentStepIndex}
      />

      {/* ⬇️ Form */}
      <div className="w-11/12 max-w-[1280px] mx-auto py-20">{renderForm()}</div>
    </>
  )
}
