import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// types
interface PropsType {
  currentStepIndex: number
  setActiveValidateIntegrationModal: (
    activeValidateIntegrationModal: boolean
  ) => void
  setCurrentStepIndex: (setCurrentStepIndex: number) => void
  labels: string[]
}

export default function InfosPerso({
  currentStepIndex,
  setActiveValidateIntegrationModal,
  setCurrentStepIndex,
  labels,
}: PropsType) {
  // handle go back
  const goNext = () => {
    setCurrentStepIndex(currentStepIndex + 1)
  }

  // handle go back
  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  console.log(setActiveValidateIntegrationModal)

  return (
    <section className="w-full mx-auto gap-10 flex flex-col ">
      {/* identité */}
      <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Identité :
        </span>
        {/* civilité */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* Prénom */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* Nom de naissance */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* Nom usuel */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* Situation familiale */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* Numéro de sécurité sociale */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
      </div>
      {/* Naissance et nationalité : */}
      <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Naissance et nationalité :
        </span>
        {/* Date de naissance */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* Pays de naissance */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* Départmemnt de naissance */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* commune de naissance */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* Pays de nationalité */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
      </div>
      {/* coordonnées & adresse */}
      <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Coordonnées :
        </span>
        {/* E-mail personnelle */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* E-mail professionnel */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* Téléphone portable personnelle */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* Téléphone portable professionnel */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* adresse */}
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Adresse :
        </span>
        {/* Pays */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* Code postal */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>

        {/* Ville */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* Adresse */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* Complément d'adresse */}
        <div>
          <span>Civilité</span>
          <span>M</span>
        </div>
        {/* Domicilié fiscalement hors de France */}
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
