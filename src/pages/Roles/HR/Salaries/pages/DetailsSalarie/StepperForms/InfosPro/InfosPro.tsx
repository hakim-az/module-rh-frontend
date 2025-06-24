import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PropsType {
  currentStepIndex: number
  setActiveValidateIntegrationModal: (
    activeValidateIntegrationModal: boolean
  ) => void
  setCurrentStepIndex: (setCurrentStepIndex: number) => void
  labels: string[]
}

export default function InfosPro({
  currentStepIndex,
  setActiveValidateIntegrationModal,
  setCurrentStepIndex,
  labels,
}: PropsType) {
  // handle go back
  const goNext = () => {
    setCurrentStepIndex(currentStepIndex + 1)
  }

  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  console.log(setActiveValidateIntegrationModal)
  return (
    <section className="w-full mx-auto gap-10 flex flex-col ">
      {/* Paiement */}
      <div className="grid grid-cols-1 items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Paiement :
        </span>
        {/* IBAN */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* BIC */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
      </div>
      {/* Contact d'urgence */}
      <div className="grid grid-cols-1 items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Contact d'urgence :
        </span>
        {/* Nom complet */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* Lien avec le salarié */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* Téléphone */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
      </div>
      <div className="w-full flex gap-16 justify-center">
        {/* revenir */}
        <Button
          onClick={goBack}
          disabled={currentStepIndex === 0}
          variant="outline"
          size={'lg'}>
          <ChevronLeft /> Revenir
        </Button>
        {/* continuer */}
        <Button
          onClick={goNext}
          disabled={currentStepIndex === labels.length}
          variant="default"
          size={'lg'}>
          {currentStepIndex === labels.length - 1 ? 'Valider' : 'Continuer'}
          <ChevronRight />
        </Button>
      </div>
    </section>
  )
}
