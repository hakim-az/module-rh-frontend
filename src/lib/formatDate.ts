export function formatDateToLabel(isoString?: string): string {
  if (!isoString) return '-'

  const date = new Date(isoString)
  if (isNaN(date.getTime())) return 'Date invalide'

  const day = `${date.getDate()}`.padStart(2, '0')
  const year = date.getFullYear()

  const monthName = date.toLocaleString('fr-FR', { month: 'long' })

  return `${day} ${monthName} ${year}`
}
