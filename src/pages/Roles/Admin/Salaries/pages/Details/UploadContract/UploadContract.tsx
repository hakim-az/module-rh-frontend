import { useState } from 'react'

// components
import Stepper from '../components/Stepper/Stepper'
import PagePath from '@/components/PagePath/PagePath'
import Contrat from './Contrat/Contrat'
import InfoPersoDispalyForm from '@/components/DisplayForms/InfoPersoDisplayForm/InfoPersoDisplayForm'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'
import InfoProDisplayForm from '@/components/DisplayForms/InfoProDisplayForm/InfoProDisplayForm'
import JustificatifsDisplayForm from '@/components/DisplayForms/JustificatifsDisplayForm/JustificatifsDisplayForm'

type IProps = {
  statusLabel: React.ReactNode
}

// types
export interface Step {
  label: string
  status: 'done' | 'current' | 'upcoming'
}

export default function UploadContract({ statusLabel }: IProps) {
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
          <section className="w-full mx-auto gap-10 flex flex-col ">
            <InfoPersoDispalyForm
              details={salarieDetails}
              loading={isLoadingSalarieDetails}
            />
            <div className="w-full flex gap-16 justify-center">
              {/* revenir */}
              <Button onClick={goBack} disabled variant="outline" size={'lg'}>
                <ChevronLeft /> Revenir
              </Button>
              {/* continuer */}
              <Button
                onClick={goNext}
                disabled={currentStepIndex === labels.length}
                variant="default"
                size={'lg'}>
                {currentStepIndex === labels.length - 1
                  ? 'Valider'
                  : 'Continuer'}
                <ChevronRight />
              </Button>
            </div>
          </section>
        )
      case 1:
        return (
          <section className="w-full mx-auto gap-10 flex flex-col ">
            <InfoProDisplayForm
              details={salarieDetails}
              loading={isLoadingSalarieDetails}
            />
            <div className="w-full flex gap-16 justify-center">
              {/* revenir */}
              <Button onClick={goBack} variant="outline" size={'lg'}>
                <ChevronLeft /> Revenir
              </Button>
              {/* continuer */}
              <Button
                onClick={goNext}
                disabled={currentStepIndex === labels.length}
                variant="default"
                size={'lg'}>
                {currentStepIndex === labels.length - 1
                  ? 'Valider'
                  : 'Continuer'}
                <ChevronRight />
              </Button>
            </div>
          </section>
        )
      case 2:
        return (
          <section>
            <JustificatifsDisplayForm
              details={salarieDetails}
              loading={isLoadingSalarieDetails}
            />
            <div className="w-full mt-20 flex gap-16 justify-center">
              <Button
                onClick={goBack}
                type="button"
                variant="outline"
                size="lg">
                <ChevronLeft /> Revenir
              </Button>

              <Button onClick={goNext} variant="default" size="lg">
                {currentStepIndex === labels.length - 1
                  ? 'Valider'
                  : 'Continuer'}
                <ChevronRight />
              </Button>
            </div>
          </section>
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
