import { useEffect, type JSX } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

export default function PublicRoutes({ children }: Props) {
  const navigate = useNavigate()
  const userRole = localStorage.getItem('userRole')

  useEffect(() => {
    // Si l'utilisateur est déjà connecté → redirection vers /acceuil
    if (userRole && userRole.trim() !== '') {
      navigate('/accueil', { replace: true })
    }
  }, [navigate, userRole])

  // Si l'utilisateur n'est pas connecté → on autorise l'accès
  if (!userRole || userRole.trim() === '') {
    return <>{children}</>
  }

  // Ne rien afficher pendant la redirection
  return null
}
