import type { DashboardData } from '../../Accueil'
import CoffreFortTable from './components/CoffreFortTable'

interface IProps {
  dashboardData: DashboardData | undefined
}

export default function CoffreFort({ dashboardData }: IProps) {
  return <CoffreFortTable dashboardData={dashboardData} />
}
