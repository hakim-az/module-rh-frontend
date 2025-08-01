import { Route, Routes } from 'react-router-dom'
import NotFound from '@/pages/NotFound/NotFound'
import Home from './pages/Home/Home'
import Details from './pages/Details/Details'
import SalarieDetailsProvider from '@/contexts/SalarieDetails/SalarieDetailsProvider'

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
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
