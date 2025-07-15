import { Route, Routes } from 'react-router-dom'
import NotFound from '@/pages/NotFound/NotFound'
import Home from './pages/Home/Home'
import Add from './pages/Add/Add'
import Details from './pages/Details/Details'
import Update from './pages/Update/Update'

export default function Absences() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="demander-une-absence" element={<Add />} />
      <Route path="details/:absenceId" element={<Details />} />
      <Route path="update/:absenceId" element={<Update />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
