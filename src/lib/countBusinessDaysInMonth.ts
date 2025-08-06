export function countBusinessDaysInMonth(year: number, month: number): number {
  const holidays = new Set([
    '2025-01-01',
    '2025-04-21',
    '2025-05-01',
    '2025-05-08',
    '2025-05-29',
    '2025-06-09',
    '2025-07-14',
    '2025-08-15',
    '2025-11-01',
    '2025-11-11',
    '2025-12-25',
  ])

  let count = 0
  const date = new Date(year, month - 1, 1) // month is 1-based (e.g. 8 = août)

  while (date.getMonth() === month - 1) {
    const day = date.getDay() // 0 = Sunday, 6 = Saturday
    const iso = date.toISOString().split('T')[0]

    if (day !== 0 && day !== 6 && !holidays.has(iso)) {
      count++
    }

    date.setDate(date.getDate() + 1)
  }

  return count
}
