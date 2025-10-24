import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import NotFound from '@/pages/NotFound/NotFound'
import Add from './pages/Add/Add'

export default function AccesExtarnets() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="ajouter-acces-et-extranets" element={<Add />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
