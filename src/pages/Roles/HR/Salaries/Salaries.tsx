import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from '@/pages/NotFound/NotFound'

// pages
const Home = React.lazy(() => import('./pages/Home/Home'))
const Details = React.lazy(() => import('./pages/Details/Details'))

export default function Salaries() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* all employees */}
        <Route index element={<Home />} />

        {/* employee contract */}
        <Route path="details/:step" element={<Details />} />

        {/* Not Found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  )
}
