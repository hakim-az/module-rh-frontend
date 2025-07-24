import { Route, Routes } from 'react-router-dom'
import Display from './Display/Display'
import Update from './Update/Update'
import NotFound from '@/pages/NotFound/NotFound'

export default function InfosPro() {
  return (
    <Routes>
      <Route index element={<Display />} />
      <Route
        path="modifier-informations-professionnelles"
        element={<Update />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
