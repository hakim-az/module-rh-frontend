import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import NotFound from '@/pages/NotFound/NotFound'
import Add from './pages/Add/Add'
import SalarieDetailsProvider from '@/contexts/SalarieDetails/SalarieDetailsProvider'

export default function AccesCollaborateurs() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route
        path="ajouter-accès/:collaborateurId"
        element={
          <SalarieDetailsProvider>
            <Add />
          </SalarieDetailsProvider>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
