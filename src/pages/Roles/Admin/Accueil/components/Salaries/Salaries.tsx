import type { DashboardData } from '../../Accueil'
import SalarieTable from './components/SalarieTable'

interface IProps {
  dashboardData: DashboardData | undefined
}

export default function Salaries({ dashboardData }: IProps) {
  return <SalarieTable dashboardData={dashboardData} />
}
