import { Route, Routes } from 'react-router-dom'
import NotFound from '@/pages/NotFound/NotFound'
import Home from './pages/Home/Home'
import Details from './pages/Details/Details'

export default function Salaries() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="details/:step" element={<Details />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
