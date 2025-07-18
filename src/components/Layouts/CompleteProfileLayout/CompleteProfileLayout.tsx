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
      case 'user-created':
        return {
          title: "01 - Formulaire d'intégration",
          description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis dolores numquam eius labore ullam sint blanditiis debitis in eaque ex neque omnis soluta ut excepturi fugiat asperiores id libero, quisquam velit perspiciatis, minus nobis. Velit molestias adipisci cumque. Quis quod vero aperiam! Nam sed numquam consectetur dolorem amet reiciendis excepturi.',
        }
      case 'profile-completed':
        return {
          title: '02 - Attendre la création du contrat',
          description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis dolores numquam eius labore ullam sint blanditiis debitis in eaque ex neque omnis soluta ut excepturi fugiat asperiores id libero, quisquam velit perspiciatis, minus nobis. Velit molestias adipisci cumque. Quis quod vero aperiam! Nam sed numquam consectetur dolorem amet reiciendis excepturi.',
        }
      case 'contract-uploaded':
        return {
          title: '03 - Signature du contrat',
          description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis dolores numquam eius labore ullam sint blanditiis debitis in eaque ex neque omnis soluta ut excepturi fugiat asperiores id libero, quisquam velit perspiciatis, minus nobis. Velit molestias adipisci cumque. Quis quod vero aperiam! Nam sed numquam consectetur dolorem amet reiciendis excepturi.',
        }
      case 'email-sent':
        return {
          title: '03 - Signature du contrat',
          description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis dolores numquam eius labore ullam sint blanditiis debitis in eaque ex neque omnis soluta ut excepturi fugiat asperiores id libero, quisquam velit perspiciatis, minus nobis. Velit molestias adipisci cumque. Quis quod vero aperiam! Nam sed numquam consectetur dolorem amet reiciendis excepturi.',
        }
      case 'contract-signed':
        return {
          title: '04 - Attendre la validation du RH',
          description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis dolores numquam eius labore ullam sint blanditiis debitis in eaque ex neque omnis soluta ut excepturi fugiat asperiores id libero, quisquam velit perspiciatis, minus nobis. Velit molestias adipisci cumque. Quis quod vero aperiam! Nam sed numquam consectetur dolorem amet reiciendis excepturi.',
        }
      default:
        return {
          title: 'Chargement...',
          description:
            'Veuillez patienter pendant le chargement de votre statut.',
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
