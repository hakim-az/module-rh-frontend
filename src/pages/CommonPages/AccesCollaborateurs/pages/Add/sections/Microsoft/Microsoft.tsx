import SectionHeader from '../../components/SectionHeader'
import MsAccountCreation from './components/MsAccountCreation'
import DisplayAccountInfo from './components/DisplayAccountInfo'
import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'

export default function Microsoft() {
  const { salarieDetails } = useSalarieDetailsContext()
  return (
    <>
      <SectionHeader
        title="Microsoft Exchange 365"
        description={
          <>
            <p className="mb-2">
              Cette page permet de gérer la création et l'administration des
              comptes email professionnels des collaborateurs (VRP,
              téléconseillers).
            </p>
            <p className="mb-2">Depuis cet espace, vous pouvez :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Créer une adresse e-mail professionnelle nominative</li>
              <li>
                Consulter les informations du compte (nom, adresse e-mail)
              </li>
              <li>
                Afficher et copier le mot de passe temporairement en toute
                sécurité
              </li>
              <li>Réinitialiser le mot de passe en cas de besoin</li>
              <li>Supprimer un compte lors du départ d'un collaborateur</li>
            </ul>
          </>
        }
      />

      {(salarieDetails?.userEmails?.length ?? 0 > 0) ? (
        <DisplayAccountInfo />
      ) : (
        <MsAccountCreation />
      )}
    </>
  )
}
