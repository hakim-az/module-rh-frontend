import { Route, Routes } from 'react-router-dom'
import NotFound from '@/pages/NotFound/NotFound'
import Home from './pages/Home/Home'
import Add from './pages/Add/Add'
import Details from './pages/Details/Details'
import Update from './pages/Update/Update'

export default function CoffreFort() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="ajouter-un-document" element={<Add />} />
      <Route path="modifier-un-document/:idCoffre" element={<Update />} />
      <Route path="details/:idCoffre" element={<Details />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
