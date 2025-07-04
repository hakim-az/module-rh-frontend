import { Route, Routes } from 'react-router-dom'
import NotFound from '@/pages/NotFound/NotFound'
import Home from './pages/Home/Home'
import Add from './pages/Add/Add'

export default function CoffreFort() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="ajouter-un-titre-restaurant" element={<Add />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
