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
      <Route path="ajouter-un-titre-restaurant" element={<Add />} />
      <Route path="details/:idTitre" element={<Details />} />
      <Route path="modifier-un-titre/:idTitre" element={<Update />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
