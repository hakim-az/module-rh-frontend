import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from '@/pages/NotFound/NotFound'

// pages
const Home = React.lazy(() => import('./pages/Home/Home'))
const Add = React.lazy(() => import('./pages/Add/Add'))

export default function CoffreFort() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* all employees */}
        <Route index element={<Home />} />

        {/* Add */}
        <Route path="ajouter-un-titre-restaurant" element={<Add />} />

        {/* Not Found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  )
}
