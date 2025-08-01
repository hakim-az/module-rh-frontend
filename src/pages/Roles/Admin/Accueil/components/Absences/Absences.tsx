import type { DashboardData } from '../../Accueil'
import AbsencesTable from './components/AbsencesTable'

interface IProps {
  dashboardData: DashboardData | undefined
}

export default function Absences({ dashboardData }: IProps) {
  return <AbsencesTable dashboardData={dashboardData} />
}
