import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from './App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
])

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
