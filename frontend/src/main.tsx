import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NextUIProvider } from '@nextui-org/react'
import { darkTheme } from './themes/darkTheme.ts'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ContextProvider } from './context/index.ts'

const query = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={query} >
      <ReactQueryDevtools />
      <NextUIProvider theme={darkTheme} >
        <ContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ContextProvider>
      </NextUIProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
