import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import UseMediaQueryProvider from './hooks/useMediaQuery/useMediaQueryProvider.tsx'
import { ErrorBoundary } from './components/ErroBoundary/ErrorBoundary.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <UseMediaQueryProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </UseMediaQueryProvider>
    </ErrorBoundary>
  </StrictMode>
)
