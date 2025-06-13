import { useEffect, type JSX } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

export default function PublicRoutes({ children }: Props) {
  const navigate = useNavigate()
  const userRole = window.localStorage.getItem('userRole')

  useEffect(() => {
    // Event listener for storage event
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === 'userRole' && event.newValue === null) {
        // Token was removed in another tab, handle it here
        // Maybe you want to log out the user or perform some other action
        console.log('Token removed from localStorage in another tab')
        navigate('/')
      }
    }

    // Add event listener on component mount
    window.addEventListener('storage', handleStorageEvent)

    // Cleanup: remove event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageEvent)
    }
  }, [navigate])

  if (userRole) {
    return <Navigate to="/accueil" />
  }

  return children
}
