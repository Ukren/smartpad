import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppRouter } from './app/AppRouter'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <AppRouter />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
)
