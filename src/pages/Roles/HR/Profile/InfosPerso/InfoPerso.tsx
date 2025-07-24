import { Route, Routes } from 'react-router-dom'
import Display from './Dispaly/Display'
import Update from './Update/Update'
import NotFound from '@/pages/NotFound/NotFound'

export default function InfoPerso() {
  return (
    <Routes>
      <Route index element={<Display />} />
      <Route path="modifier-informations-personnelles" element={<Update />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
