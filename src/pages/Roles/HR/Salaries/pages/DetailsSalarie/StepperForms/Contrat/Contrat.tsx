import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PropsType {
  currentStepIndex: number
  setActiveValidateIntegrationModal: (b: boolean) => void
  labels: string[]
  goNext: () => void
  goBack: () => void
}

export default function Contrat({
  currentStepIndex,
  setActiveValidateIntegrationModal,
  labels,
  goNext,
  goBack,
}: PropsType) {
  const onSubmit = () => {
    goNext()
    if (currentStepIndex === labels.length - 1) {
      setActiveValidateIntegrationModal(true)
    }
  }

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-7 gap-10 rounded-md border border-gray-200 shadow-md w-full">
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>

        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>

        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>

        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
      </div>

      <div className="w-full mt-20 flex gap-16 justify-center">
        <Button onClick={goBack} type="button" variant="outline" size="lg">
          <ChevronLeft /> Revenir
        </Button>

        <Button onClick={onSubmit} variant="default" size="lg">
          {currentStepIndex === labels.length - 1 ? 'Valider' : 'Continuer'}
          <ChevronRight />
        </Button>
      </div>
    </section>
  )
}
