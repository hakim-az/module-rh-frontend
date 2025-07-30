import Banner from './components/Banner/Banner'
import Header from './components/Header/Header'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'

export interface IPramasCompleteProfileLayout {
  children: React.ReactNode
}

export default function CompleteProfileLayout({
  children,
}: IPramasCompleteProfileLayout) {
  const { userDetails } = useDashboardContext()

  const renderBannerContent = (status: string | undefined) => {
    switch (status) {
      case '':
        return {
          title: 'Chargement...',
          description:
            'Veuillez patienter pendant le chargement de votre statut.',
        }
      case 'profile-completed':
        return {
          title: '2 - Attente de la création du contrat',
          description: (
            <ul className="list-disc pl-6 text-lg text-[#000000] space-y-2">
              <li>Votre formulaire d'intégration a été envoyé avec succès.</li>
              <li>
                Notre équipe RH est en train de vérifier vos informations.
              </li>
              <li>
                Une fois le traitement terminé, votre contrat sera généré avec
                les informations nécessaires.
              </li>
              <li>
                Un fichier PDF du contrat vous sera ensuite transmis pour
                signature.
              </li>
              <li>
                Vous recevrez une notification dès que le contrat sera prêt.
              </li>
            </ul>
          ),
        }
      case 'contract-uploaded':
        return {
          title: '03 - Signature du contrat',
          description: (
            <ul className="list-disc pl-6 text-lg text-[#000000] space-y-2">
              <li>Votre contrat est maintenant disponible pour lecture.</li>
              <li>
                Veuillez cliquer sur le bouton
                <strong>"Signer contrat"</strong> pour lancer la procédure.
              </li>
              <li>
                Vous serez redirigé vers la plateforme Yousign afin de finaliser
                la signature électronique.
              </li>
              <li>
                Un email de confirmation vous sera envoyé par Yousign une fois
                la signature effectuée.
              </li>
            </ul>
          ),
        }
      case 'email-sent':
        return {
          title: '4 - Signature du contrat par email',
          description: (
            <ul className="list-disc pl-6 text-lg text-[#000000] space-y-2">
              <li>
                Un email contenant votre contrat a été envoyé via Yousign.
              </li>
              <li>
                Consultez votre boîte mail et suivez le lien pour signer
                électroniquement votre contrat.
              </li>
              <li>Une fois le contrat signé, téléchargez-le depuis Yousign.</li>
              <li>
                Revenez ici et importez le contrat signé via le champ prévu à
                cet effet.
              </li>
            </ul>
          ),
        }
      case 'contract-signed':
        return {
          title: '5 - Attente de validation du RH',
          description: (
            <ul className="list-disc pl-6 text-lg text-[#000000] space-y-2">
              <li>Votre contrat signé a bien été reçu.</li>
              <li>
                Le service RH est en train de vérifier et valider les
                informations fournies.
              </li>
              <li>
                Dès que le contrat est approuvé, votre compte sera activé.
              </li>
              <li>Vous recevrez un accès complet à votre espace personnel.</li>
            </ul>
          ),
        }
      default:
        return {
          title: "1 - Formulaire d'intégration",
          description: (
            <ul className="list-disc pl-6 text-lg text-[#000000] space-y-2">
              <li>
                Remplissez vos informations personnelles : nom, prénom, date de
                naissance, etc.
              </li>
              <li>
                Saisissez vos informations professionnelles : poste, type de
                contrat, date de début, etc.
              </li>
              <li>
                Téléversez vos justificatifs obligatoires :
                <ul className="list-disc pl-6 mt-1">
                  <li>Carte Vitale</li>
                  <li>Attestation AMELI</li>
                  <li>Pièce d'identité (CNI ou passeport)</li>
                  <li>RIB (Relevé d'identité bancaire)</li>
                  <li>Justificatif de domicile</li>
                </ul>
              </li>
              <li>Vérifiez que toutes les informations sont correctes.</li>
              <li>Validez le formulaire pour l’envoyer à l’équipe RH.</li>
              <li>
                Une fois traité, vous serez notifié de la prochaine étape.
              </li>
            </ul>
          ),
        }
    }
  }

  const { title, description } = renderBannerContent(userDetails?.statut)

  return (
    <>
      <Header />
      <Banner title={title} description={description} />
      {children}
    </>
  )
}
