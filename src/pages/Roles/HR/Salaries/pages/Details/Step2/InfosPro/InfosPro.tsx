import DisplayInput from '@/components/DisplayInput/DisplayInput'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PropsType {
  currentStepIndex: number
  setCurrentStepIndex: (setCurrentStepIndex: number) => void
  labels: string[]
}

export default function InfosPro({
  currentStepIndex,
  setCurrentStepIndex,
  labels,
}: PropsType) {
  // salarie details context
  const { salarieDetails, isLoadingSalarieDetails } = useSalarieDetailsContext()

  // handle go back
  const goNext = () => {
    setCurrentStepIndex(currentStepIndex + 1)
  }

  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  return (
    <>
      {isLoadingSalarieDetails ? (
        <div className="w-full bg-white h-80 flex items-center justify-center border border-gray-300 rounded-md shadow">
          <LoadingSpinner />
        </div>
      ) : (
        <section className="w-full mx-auto gap-10 flex flex-col ">
          {/* Informations bancaire */}
          <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Informations bancaire :
            </span>
            {/* IBAN */}
            <DisplayInput
              label="IBAN"
              value={salarieDetails?.paiement.iban ?? '-'}
            />
            {/* BIC */}
            <DisplayInput
              label="BIC"
              value={salarieDetails?.paiement.bic ?? '-'}
            />
          </div>
          {/* Contact d'urgence */}
          <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Contact d'urgence :
            </span>
            {/* Nom complet */}
            <DisplayInput
              label="Nom complet"
              value={salarieDetails?.urgence.nomComplet ?? '-'}
            />
            {/* Lien avec le salarié */}
            <DisplayInput
              label="Lien avec le salarié "
              value={salarieDetails?.urgence.lienAvecLeSalarie ?? '-'}
            />
            {/* Téléphone */}
            <DisplayInput
              label="Téléphone"
              value={salarieDetails?.urgence.telephone ?? '-'}
            />
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
      )}
    </>
  )
}
