import type { Absence, Coffre, Restauration, User } from '@/types/user.types'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import Cards from './components/Cards/Cards'
import CoffreFort from './components/CoffreFort/CoffreFort'
import Absences from './components/Absences/Absences'
import TitreRestaurant from './components/TitreRestaurant/TitreRestaurant'
import AbsencesChart from './components/Charts/AbsencesChart'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'

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

export default function Accueil() {
  const { userDetails } = useDashboardContext()
  const [dashboardData, seteDashboardData] = useState<DashboardData>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // fetch Dashboard
  const fetchDashboard = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/dashboard/${userDetails?.id}`
      )
      console.log(response)
      seteDashboardData(response.data.data)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }, [userDetails?.id])

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  if (isLoading) {
    return 'loading...'
  }

  return (
    <section className="w-11/12 max-w-[1280px] mx-auto py-18 flex flex-col gap-18">
      <Cards dashboardData={dashboardData} />
      <div className="grid grid-cols-1 mx-auto gap-16">
        <AbsencesChart />
      </div>
      <Absences dashboardData={dashboardData} />
      <CoffreFort dashboardData={dashboardData} />
      <TitreRestaurant dashboardData={dashboardData} />
    </section>
  )
}
