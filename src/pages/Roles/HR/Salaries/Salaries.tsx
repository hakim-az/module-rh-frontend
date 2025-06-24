import NotFound from '@/pages/NotFound/NotFound'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

// pages
const Home = React.lazy(() => import('./pages/Home/Home'))

export default function Salaries() {
  return (
    <Routes>
      {/* all employees */}
      <Route index element={<Home />} />

      {/* employee contract */}
      {/* <Route path='' index element={<Home />} /> */}

      {/* Not Found page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
