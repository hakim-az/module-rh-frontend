import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import UseMediaQueryProvider from './hooks/useMediaQuery/useMediaQueryProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UseMediaQueryProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UseMediaQueryProvider>
  </StrictMode>
)
