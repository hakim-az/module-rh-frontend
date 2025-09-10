import { Route, Routes } from 'react-router-dom'
import NotFound from '@/pages/NotFound/NotFound'
import Home from './pages/Home/Home'
import Details from './pages/Details/Details'
import SalarieDetailsProvider from '@/contexts/SalarieDetails/SalarieDetailsProvider'
import IntegrationFormProvider from '@/contexts/CompleteProfile/IntegrationForm/IntegrationFormProvider'
import Add from './pages/Add/Add'
import Coffre from './pages/Coffre/Coffre'

export default function Salaries() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route
        path="details/:idSalarie"
        element={
          <SalarieDetailsProvider>
            <Details />
          </SalarieDetailsProvider>
        }
      />
      <Route path={`coffre/:idSalarie`} element={<Coffre />} />
      <Route
        path="ajouter-salarié"
        element={
          <IntegrationFormProvider>
            <Add />
          </IntegrationFormProvider>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
