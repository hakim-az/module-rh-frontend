import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { Lock } from 'lucide-react'

export default function Banner() {
  const { userDetails } = useDashboardContext()

  // Define color scheme based on role
  const roleColors = {
    admin: '#1B86CB',
    hr: '#4141D2',
    employee: '#09090B',
    assistant: '#2A9D8F',
    gestionnaire: '#C2185B',
  }

  // Fallback to admin color if role not matched
  const bg = roleColors[userDetails?.role as keyof typeof roleColors]
  return (
    <div
      className="w-11/12 p-8 lg:p-10 relative mx-auto overflow-hidden my-16 max-w-[1280px] text-white min-h-[320px] rounded-lg"
      style={{ backgroundColor: `${bg}30` }}>
      <Lock
        className="absolute right-0 bottom-0 opacity-20 lg:opacity-80 -m-14 w-96 h-96"
        style={{ stroke: `${bg}` }}
      />
      <div>
        <span
          className="text-2xl inline-block mb-4 font-medium"
          style={{ color: bg }}>
          Gérez votre coffre-fort numérique en toute sécurité :
        </span>
        <ul className="list-disc pl-6 text-lg" style={{ color: bg }}>
          <li>Consultez la liste des documents ajoutés.</li>
          <li>Visualisez les détails de chaque document stocké.</li>
          <li>
            Ajoutez des documents tels que bulletins de paie, attestations, etc.
          </li>
          <li>Modifiez les documents existants facilement.</li>
          <li>Assurez la confidentialité et la sécurité des données.</li>
        </ul>
      </div>
    </div>
  )
}
