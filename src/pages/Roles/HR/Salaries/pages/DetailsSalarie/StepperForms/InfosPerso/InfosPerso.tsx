import DisplayInput from '@/components/DisplayInput/DisplayInput'
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
        <DisplayInput label="Civilité" value="M" />
        {/* Prénom */}
        <DisplayInput label="Prénom" value="Abdelhakim" />
        {/* Nom de naissance */}
        <DisplayInput label="Nome de naissance" value="AZZAZ" />
        {/* Nom usuel */}
        <DisplayInput label="Nom usuel" value="AZZAZ" />
        {/* Situation familiale */}
        <DisplayInput label="Situation familiale" value="Célibataire" />
        {/* Numéro de sécurité sociale */}
        <DisplayInput
          label="Numéro de sécurité sociale"
          value="234365983667738"
        />
      </div>
      {/* Naissance et nationalité : */}
      <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Naissance et nationalité :
        </span>
        {/* Date de naissance */}
        <DisplayInput label="Date de naissance" value="19/08/2001" />
        {/* Pays de naissance */}
        <DisplayInput label="Pays de naissance" value="Algérie" />
        {/* Départmemnt de naissance */}
        <DisplayInput label="Départmemnt de naissance" value="Alger" />
        {/* commune de naissance */}
        <DisplayInput label="commune de naissance" value="Alger" />
        {/* Pays de nationalité */}
        <DisplayInput label="Pays de nationalité" value="Algérie" />
      </div>
      {/* coordonnées & adresse */}
      <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Coordonnées :
        </span>
        {/* E-mail personnelle */}
        <DisplayInput
          label="E-mail personnelle"
          value="azzaz.abdelhakim@gmail.com"
        />
        {/* E-mail professionnel */}
        <DisplayInput
          label="E-mail professionnel"
          value="a.azzaz@finanssor.fr"
        />
        {/* Téléphone portable personnelle */}
        <DisplayInput
          label="Téléphone portable personnelle"
          value="+33 7 77 77 77 77"
        />
        {/* Téléphone portable professionnel */}
        <DisplayInput
          label="Téléphone portable professionnel"
          value="+33 7 77 77 77 77"
        />
        {/* adresse */}
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Adresse :
        </span>
        {/* Pays */}
        <DisplayInput label="Pays" value="France" />
        {/* Code postal */}
        <DisplayInput label="Code postal" value="92240" />
        {/* Ville */}
        <DisplayInput label="Ville" value="Malakoff" />
        {/* Adresse */}
        <DisplayInput label="Adresse" value="20 rue pierre valette" />
        {/* Complément d'adresse */}
        <DisplayInput label="Complément d'adresse" value="Appartement 306" />
        {/* Domicilié fiscalement hors de France */}
        {/* <DisplayInput
          label="E-mail personnelle"
          value="azzaz.abdelhakim@gmail.com"
        /> */}
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
