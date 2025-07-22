import { countriesData } from '@/components/__mock__/Countries'

export function getCountryLabel(value: string | number | undefined): string {
  if (!value) return '-'
  const country = countriesData.find((c) => c.value === String(value))
  return country?.label ?? '-'
}
