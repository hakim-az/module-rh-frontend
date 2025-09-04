import type { Absence, Coffre, Restauration, User } from '@/types/user.types'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Cards from './components/Cards/Cards'
import Salaries from './components/Salaries/Salaries'
import CoffreFort from './components/CoffreFort/CoffreFort'
import Absences from './components/Absences/Absences'
import TitreRestaurant from './components/TitreRestaurant/TitreRestaurant'
import AbsencesChart from './components/Charts/AbsencesChart'
import UsersChart from './components/Charts/UsersChart'

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

// fetcher function
const fetchDashboard = async (): Promise<DashboardData> => {
  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data.data
}

export default function Accueil() {
  const {
    data: dashboardData,
    isLoading,
    isError,
    error,
  } = useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
    staleTime: 1000 * 60 * 5, // cache for 5 min
  })

  if (isError) {
    return <p className="text-red-500">Error: {(error as Error).message}</p>
  }

  return (
    <section className="w-11/12 max-w-[1280px] mx-auto py-18 flex flex-col gap-18">
      <Cards dashboardData={dashboardData} isLoading={isLoading} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <UsersChart />
        <AbsencesChart />
      </div>
      <Salaries
        dashboardData={dashboardData}
        isError={isError}
        isLoading={isLoading}
      />
      <Absences
        dashboardData={dashboardData}
        isError={isError}
        isLoading={isLoading}
      />
      <CoffreFort
        dashboardData={dashboardData}
        isError={isError}
        isLoading={isLoading}
      />
      <TitreRestaurant
        dashboardData={dashboardData}
        isError={isError}
        isLoading={isLoading}
      />
    </section>
  )
}
