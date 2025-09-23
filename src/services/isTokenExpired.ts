export default function isTokenExpired(): boolean {
  const storedUser = sessionStorage.getItem('auth_user')
  if (!storedUser) return true

  const user = JSON.parse(storedUser)
  const token = user.token // assuming you stored access token
  if (!token) return true

  const payload = JSON.parse(atob(token.split('.')[1]))
  const now = Math.floor(Date.now() / 1000)

  return payload.exp < now
}
