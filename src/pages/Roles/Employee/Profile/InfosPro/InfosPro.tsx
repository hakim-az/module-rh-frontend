import DisplayInput from '@/components/DisplayInput/DisplayInput'
import ProfileBanner from './components/ProfileBanner'

import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import JustificatifsDisplayForm from '@/components/DisplayForms/JustificatifsDisplayForm/JustificatifsDisplayForm'

export default function InfosPro() {
  const { userDetails, isLoadingUser } = useDashboardContext()

  return (
    <>
      <ProfileBanner />
      {isLoadingUser ? (
        <>Loading...</>
      ) : (
        <section className="w-11/12 max-w-[1200px] pb-28 mx-auto gap-10 flex flex-col ">
          {/* Informations bancaire : */}
          <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Informations bancaire :
            </span>
            {/* IBAN */}
            <DisplayInput
              label="IBAN"
              value={userDetails?.paiement.iban ?? '-'}
            />
            {/* BIC */}
            <DisplayInput
              label="BIC"
              value={userDetails?.paiement.bic ?? '-'}
            />
          </div>
          {/* Contacte d'urgence : */}
          <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Contacte urgence :
            </span>
            {/* Nom complet */}
            <DisplayInput
              label="Nom complet"
              value={userDetails?.urgence.nomComplet ?? '-'}
            />
            {/* Lien avec le salarié */}
            <DisplayInput
              label="Lien avec le salarié"
              value={userDetails?.urgence.lienAvecLeSalarie ?? '-'}
            />
            {/* Téléphone */}
            <DisplayInput
              label="Téléphone"
              value={userDetails?.urgence.telephone ?? '-'}
            />
          </div>
          {/* Définition du contrat : */}
          <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Définition du contrat :
            </span>
            {/* Poste */}
            <DisplayInput
              label="Poste"
              value={userDetails?.contrat.poste ?? '-'}
            />
            {/* Type de cpntrat */}
            <DisplayInput
              label="Type de cpntrat"
              value={userDetails?.contrat.typeContrat ?? '-'}
            />
            {/* Date de début */}
            <DisplayInput
              label="Date de début"
              value={userDetails?.contrat.dateDebut ?? '-'}
            />
            {/* Date de fin */}
            <DisplayInput
              label="Date de fin"
              value={userDetails?.contrat.dateFin ?? '-'}
            />
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              L'établissement et le service de santé : :
            </span>
            {/* Etablissement de sante */}
            <DisplayInput
              label="Etablissement de sante"
              value={userDetails?.contrat.etablissementDeSante ?? '-'}
            />
            {/* Service de santé */}
            <DisplayInput
              label="Service de santé"
              value={userDetails?.contrat.serviceDeSante ?? '-'}
            />
          </div>
          {/* Contacte d'urgence : */}
          <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Rémuniration:
            </span>
            {/* Mode salaire de base */}
            <DisplayInput
              label="Mode salaire de base"
              value={userDetails?.contrat.salaire ?? '-'}
            />
          </div>
          {/* documents */}
          <JustificatifsDisplayForm
            details={userDetails}
            loading={isLoadingUser}
          />
        </section>
      )}
    </>
  )
}
