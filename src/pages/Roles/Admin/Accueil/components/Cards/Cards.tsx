import { Users, CalendarOff, Lock, CreditCard } from 'lucide-react'
import type { DashboardData } from '../../Accueil'

interface IProps {
  dashboardData: DashboardData | undefined
  isLoading: boolean
}

export default function Cards({ dashboardData, isLoading }: IProps) {
  const cards = [
    {
      id: 1,
      title: 'Salariés',
      total: dashboardData?.totals.users,
      icon: Users,
    },
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
    <div className="w-full gap-5 grid grid-cols-1 md:grid lg:grid-cols-4">
      {isLoading
        ? // Skeletons
          cards.map((card) => (
            <div
              key={`skeleton-${card.id}`}
              className="bg-gray-200 animate-pulse border p-5 flex gap-20 flex-col items-end border-gray-300 shadow rounded-md">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div className="w-full flex items-center justify-between">
                <div className="w-20 h-4 bg-gray-300 rounded" />
                <div className="w-10 h-6 bg-gray-300 rounded" />
              </div>
            </div>
          ))
        : cards.map((card) => (
            <div
              key={card.id}
              className="bg-[#1E3A8A] border p-5 flex gap-20 flex-col items-end border-gray-300 shadow rounded-md">
              <card.icon className="w-10 h-10 text-white" />
              <div className="w-full flex text-white items-center justify-between">
                <span className="text-lg font-medium">{card.title}</span>
                <span className="text-2xl font-semibold">
                  {card?.total ?? 0}
                </span>
              </div>
            </div>
          ))}
    </div>
  )
}
