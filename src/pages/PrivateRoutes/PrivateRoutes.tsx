import { useEffect, type JSX } from 'react'

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

export default function PrivateRoutes({ children }: Props) {
  const userRole = localStorage.getItem('userRole')

  useEffect(() => {
    // Redirection si token supprimé dans un autre onglet
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === 'userRole' && event.newValue === null) {
        console.log('Token supprimé dans un autre onglet')
        window.location.href = 'http://localhost:5173'
      }
    }

    window.addEventListener('storage', handleStorageEvent)
    return () => {
      window.removeEventListener('storage', handleStorageEvent)
    }
  }, [])

  // Si l'utilisateur n'est pas connecté → redirection vers Google
  if (!userRole || userRole.trim() === '') {
    window.location.href = 'http://localhost:5173'
    return null
  }

  // Sinon, l'utilisateur est connecté → on retourne les enfants
  return <>{children}</>
}
