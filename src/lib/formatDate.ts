export function formatDateToLabel(isoString?: string): string {
  if (!isoString) return '-'

  const date = new Date(isoString)
  if (isNaN(date.getTime())) return 'Invalid date'

  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')

  return `${day} - ${month} - ${year}`
}
