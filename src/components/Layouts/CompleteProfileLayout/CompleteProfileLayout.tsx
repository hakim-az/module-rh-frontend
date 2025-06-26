import { useEffect, useState } from 'react'
import Banner from './components/Banner/Banner'
import Header from './components/Header/Header'

export interface IPramasCompleteProfileLayout {
  children: React.ReactNode
}

type UserStatus = 'step-1' | 'step-2' | 'step-3' | 'step-4'

export default function CompleteProfileLayout({
  children,
}: IPramasCompleteProfileLayout) {
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedRole = localStorage.getItem('userStatus') as UserStatus | null

      const validRoles: UserStatus[] = ['step-1', 'step-2', 'step-3', 'step-4']
      if (storedRole && validRoles.includes(storedRole)) {
        setUserStatus(storedRole)
      } else {
        setUserStatus('step-1') // fallback
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const renderBannerContent = (status: UserStatus | null) => {
    switch (status) {
      case 'step-1':
        return {
          title: "01 - Formulaire d'intégration",
          description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis dolores numquam eius labore ullam sint blanditiis debitis in eaque ex neque omnis soluta ut excepturi fugiat asperiores id libero, quisquam velit perspiciatis, minus nobis. Velit molestias adipisci cumque. Quis quod vero aperiam! Nam sed numquam consectetur dolorem amet reiciendis excepturi.',
        }
      case 'step-2':
        return {
          title: '02 - Attendre la création du contrat',
          description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis dolores numquam eius labore ullam sint blanditiis debitis in eaque ex neque omnis soluta ut excepturi fugiat asperiores id libero, quisquam velit perspiciatis, minus nobis. Velit molestias adipisci cumque. Quis quod vero aperiam! Nam sed numquam consectetur dolorem amet reiciendis excepturi.',
        }
      case 'step-3':
        return {
          title: '03 - Signature du contrat',
          description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis dolores numquam eius labore ullam sint blanditiis debitis in eaque ex neque omnis soluta ut excepturi fugiat asperiores id libero, quisquam velit perspiciatis, minus nobis. Velit molestias adipisci cumque. Quis quod vero aperiam! Nam sed numquam consectetur dolorem amet reiciendis excepturi.',
        }
      case 'step-4':
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

  const { title, description } = renderBannerContent(userStatus)

  return (
    <>
      <Header />
      <Banner title={title} description={description} />
      {children}
    </>
  )
}
