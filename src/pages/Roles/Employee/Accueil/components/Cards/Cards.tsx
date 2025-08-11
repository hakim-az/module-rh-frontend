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
      total: dashboardData?.totals.absences,
      icon: CalendarOff,
    },
    {
      id: 3,
      title: 'Coffres fort',
      total: dashboardData?.totals.coffres,
      icon: Lock,
    },
    {
      id: 4,
      title: 'Titre restaurant',
      total: dashboardData?.totals.restaus,
      icon: CreditCard,
    },
  ]
  return (
    <div className="w-full gap-x-20 gap-y-4 flex flex-col lg:col-span-1">
      {/* card */}
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-[#09090B] border p-5 flex gap-14 lg:max-w-[500px] flex-col items-end border-gray-300 shadow rounded-md text-white">
          {/* icon */}
          <card.icon className="w-10 h-10" />
          {/* data */}
          <div className="w-full flex items-center justify-between">
            <span className="text-lg font-medium">{card.title}</span>
            <span className="text-3xl font-semibold">{card?.total ?? 0}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
