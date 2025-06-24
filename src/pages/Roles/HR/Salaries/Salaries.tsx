import NotFound from '@/pages/NotFound/NotFound'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

// pages
const Home = React.lazy(() => import('./pages/Home/Home'))
const DetailsSalarie = React.lazy(
  () => import('./pages/DetailsSalarie/DetailsSalarie')
)

export default function Salaries() {
  return (
    <Routes>
      {/* all employees */}
      <Route index element={<Home />} />

      {/* employee contract */}
      <Route path="details/:id" index element={<DetailsSalarie />} />

      {/* Not Found page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
