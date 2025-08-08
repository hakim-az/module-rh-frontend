import { LogOut } from 'lucide-react'

// Configuration Keycloak depuis .env
const KEYCLOAK_BASE_URL = import.meta.env.VITE_KEYCLOAK_BASE_URL
const REALM = import.meta.env.VITE_KEYCLOAK_REALM
const CLIENT_ID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET

// Fonction logout Keycloak
async function keycloakLogout() {
  const authUser = JSON.parse(localStorage.getItem('auth_user') || '{}')
  const refreshToken = authUser.refreshToken

  if (!refreshToken) {
    // Pas de token = rediriger directement
    window.location.href = 'http://localhost:5173/'
    return
  }

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: refreshToken,
  })

  try {
    const response = await fetch(
      `${KEYCLOAK_BASE_URL}/realms/${REALM}/protocol/openid-connect/logout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Erreur Keycloak logout:', errorText)
    }
  } catch (error) {
    console.error('Erreur réseau Keycloak logout:', error)
  }

  // Nettoyage local
  localStorage.removeItem('auth_user')
  window.location.href = 'http://localhost:5173/'
}

// Composant Header
export default function Header() {
  const handleLogout = () => {
    keycloakLogout()
  }

  return (
    <nav className="w-full bg-white shadow-sm mb-20">
      <div className="w-11/12 mx-auto max-w-[1200px] py-6 flex items-center justify-between">
        <span className="text-2xl font-medium">Logo</span>
        <button
          type="button"
          onClick={handleLogout}
          className="flex border hover:border-blue-500 border-black text-sm hover:bg-blue-500 hover:text-white ease-in-out px-6 py-3 rounded-md transition-all delay-75 items-center cursor-pointer justify-center gap-5">
          Se déconnecter
          <LogOut />
        </button>
      </div>
    </nav>
  )
}
