export const pagePath = (pathname: string) => {
  const dashboardIndex = pathname.indexOf('/accueil/')
  if (dashboardIndex === -1) return ''

  // Get the path after '/accueil/'
  const subPath = pathname.substring(dashboardIndex + '/accueil/'.length)
  const parts = subPath.split('/').filter((part) => part)

  return parts
    .map((part) => decodeURIComponent(part).replace(/-/g, ' '))
    .join(' > ')
}
