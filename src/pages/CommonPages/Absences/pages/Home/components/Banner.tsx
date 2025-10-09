import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { CalendarOff } from 'lucide-react'

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
      <CalendarOff
        className="absolute right-0 bottom-0 -my-14 w-96 h-96 opacity-20 lg:opacity-80"
        style={{ stroke: `${bg}` }}
      />
      <div>
        <span
          className="text-2xl inline-block mb-4 font-medium"
          style={{ color: bg }}>
          Gérez les demandes d'absence efficacement :
        </span>
        <ul className="list-disc pl-6 text-lg" style={{ color: bg }}>
          <li>Visualisez la liste complète des demandes d'absence.</li>
          <li>Consultez les détails de chaque demande rapidement.</li>
          <li>Approuvez ou refusez les demandes en un seul clic.</li>
          <li>Suivez en temps réel le statut des demandes.</li>
          <li>Assurez une gestion fluide et transparente des absences.</li>
        </ul>
      </div>
    </div>
  )
}
