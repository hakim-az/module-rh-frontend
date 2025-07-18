import DisplayInput from '@/components/DisplayInput/DisplayInput'
import FileViewer from './FileViewer/FileViewer'
import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'

export default function Contrat() {
  const { salarieDetails, isLoadingSalarieDetails } = useSalarieDetailsContext()
  return (
    <>
      {isLoadingSalarieDetails ? (
        <>Loading...</>
      ) : (
        <section className="w-full mx-auto gap-10 flex flex-col ">
          <div className="grid grid-cols-1  bg-white lg:grid-cols-2 p-7 gap-10 rounded-md border border-gray-200 shadow-md w-full">
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Définition du contrat :
            </span>
            {/* Poste */}
            <DisplayInput
              label="Poste"
              value={salarieDetails?.contrat.poste ?? '-'}
            />
            {/* Type de contrat */}
            <DisplayInput
              label="Type de contrat"
              value={salarieDetails?.contrat.typeContrat ?? '-'}
            />
            {/* Date de début */}
            <DisplayInput
              label="Date de début"
              value={salarieDetails?.contrat.dateDebut ?? '-'}
            />
            {/* Date de fin */}
            <DisplayInput
              label="Date de fin"
              value={salarieDetails?.contrat.dateFin ?? '-'}
            />
            {/* Matricule */}
            <DisplayInput
              label="Matricule"
              value={salarieDetails?.contrat.matricule ?? '-'}
            />
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              L'établissement et le service de santé :
            </span>
            {/* Etablissement */}
            <DisplayInput
              label="Etablissement"
              value={salarieDetails?.contrat.etablissementDeSante ?? '-'}
            />
            {/* Service de santé */}
            <DisplayInput
              label="Service de santé"
              value={salarieDetails?.contrat.serviceDeSante ?? '-'}
            />
          </div>
          <div className="grid grid-cols-1  bg-white lg:grid-cols-2 p-7 gap-10 rounded-md border border-gray-200 shadow-md w-full">
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Rémunération :
            </span>
            {/* Mode de salaire de base */}
            <DisplayInput
              label="Mode de salaire de base"
              value={salarieDetails?.contrat.salaire ?? '-'}
            />
          </div>
          <div className="p-6 border border-gray-300 shadow bg-white rounded-md">
            <span className="text-xl mb-12 col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Contrat d'intégration :
            </span>
            <FileViewer />
          </div>
        </section>
      )}{' '}
    </>
  )
}
