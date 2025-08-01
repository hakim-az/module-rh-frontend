import type { DashboardData } from '../../Accueil'
import TitreRestaurantTable from './components/TitreRestaurantTable'

interface IProps {
  dashboardData: DashboardData | undefined
}

export default function TitreRestaurant({ dashboardData }: IProps) {
  return <TitreRestaurantTable dashboardData={dashboardData} />
}
