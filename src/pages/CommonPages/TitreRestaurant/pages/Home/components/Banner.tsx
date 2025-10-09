import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { CreditCard } from 'lucide-react'

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
      className="w-11/12 p-10 relative mx-auto overflow-hidden my-16 max-w-[1280px] text-white min-h-[320px] rounded-lg"
      style={{ backgroundColor: `${bg}30` }}>
      <CreditCard
        className="absolute right-0 bottom-0 opacity-20 lg:opacity-80 -m-14 w-96 h-96"
        style={{ stroke: `${bg}` }}
      />
      <div>
        <span
          className="text-2xl inline-block mb-4 font-medium"
          style={{ color: bg }}>
          Gérez les titres-restaurant et leurs suivis :
        </span>
        <ul className="list-disc pl-6 text-lg" style={{ color: bg }}>
          <li>Visualisez la liste des suivis des titres-restaurant ajoutés.</li>
          <li>Consultez les détails de chaque titre-restaurant.</li>
          <li>Ajoutez un nouveau suivi de titre-restaurant.</li>
          <li>Modifiez les suivis existants facilement.</li>
          <li>Assurez un suivi précis et à jour des titres-restaurant.</li>
        </ul>
      </div>
    </div>
  )
}
