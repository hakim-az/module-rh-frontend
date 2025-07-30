import { CalendarOff, Lock, CreditCard } from 'lucide-react'
import type { DashboardData } from '../../Accueil'

interface IProps {
  dashboardData: DashboardData | undefined
}

export default function Cards({ dashboardData }: IProps) {
  const cards = [
    {
      id: 2,
      title: 'Absences',
      total: dashboardData?.latest.absences,
      icon: CalendarOff,
    },
    {
      id: 3,
      title: 'Coffres fort',
      total: dashboardData?.latest.coffres,
      icon: Lock,
    },
    {
      id: 4,
      title: 'Titre restaurant',
      total: dashboardData?.latest.restaus,
      icon: CreditCard,
    },
  ]
  return (
    <div className="w-full gap-x-20 gap-y-8  grid grid-cols-1 md:grid lg:grid-cols-3">
      {/* card */}
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white border p-5 flex gap-20 flex-col items-end border-gray-300 shadow rounded">
          {/* icon */}
          <card.icon className="w-10 h-10 text-gray-700" />
          {/* data */}
          <div className="w-full flex items-center justify-between">
            <span className="text-lg font-medium">{card.title}</span>
            <span className="text-2xl font-semibold">
              {card?.total?.length ?? 0}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
