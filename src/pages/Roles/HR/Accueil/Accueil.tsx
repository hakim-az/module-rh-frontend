import type { Absence, Coffre, Restauration, User } from '@/types/user.types'
import axios from 'axios'
import Cards from './components/Cards/Cards'
import Salaries from './components/Salaries/Salaries'
import CoffreFort from './components/CoffreFort/CoffreFort'
import Absences from './components/Absences/Absences'
import TitreRestaurant from './components/TitreRestaurant/TitreRestaurant'
import AbsencesChart from './components/Charts/AbsencesChart'
import UsersChart from './components/Charts/UsersChart'
import { useQuery } from '@tanstack/react-query'

export interface DashboardData {
  totals: {
    users: number
    absences: number
    coffres: number
    restaus: number
  }
  latest: {
    users: User[]
    absences: Absence[]
    coffres: Coffre[]
    restaus: Restauration[]
  }
}

// ✅ Fetcher function
const fetchDashboard = async (): Promise<DashboardData> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/dashboard`
  )
  return response.data.data
}

export default function Accueil() {
  // ✅ React Query hook
  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
    refetchOnWindowFocus: false, // optional
  })

  return (
    <section className="w-11/12 max-w-[1280px] mx-auto py-18 flex flex-col gap-18">
      <Cards dashboardData={dashboardData} isLoading={isLoading} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <UsersChart />
        <AbsencesChart />
      </div>
      <Salaries
        dashboardData={dashboardData}
        isLoading={isLoading}
        isError={isError}
      />
      <Absences
        dashboardData={dashboardData}
        isLoading={isLoading}
        isError={isError}
      />
      <CoffreFort
        dashboardData={dashboardData}
        isLoading={isLoading}
        isError={isError}
      />
      <TitreRestaurant
        dashboardData={dashboardData}
        isLoading={isLoading}
        isError={isError}
      />
    </section>
  )
}
