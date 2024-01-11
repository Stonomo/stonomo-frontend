import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './components/AuthLayout'
import { HomeLayout } from './components/HomeLayout'
import { ProtectedLayout } from './components/ProtectedLayout'
import { HomePage } from './pages/Home'
import { SignIn } from './routes/login'
import { ProfilePage } from './pages/Profile'
import './index.css'
import { SearchPage } from './routes/search'
import { ReportPage } from './routes/report'
import { SettingsPage } from './routes/settings'
import { ManagePage } from './routes/manage'

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <HomeLayout />,
        children: [
          {
            path: '/',
            element: <HomePage />,
            index: true,
          },
          {
            path: '/login',
            element: <SignIn />,
          }]
      },
      {
        path: '/dashboard',
        element: <ProtectedLayout />,
        children: [
          {
            path: 'profile',
            element: <ProfilePage />,
          }, {
            path: 'search',
            element: <SearchPage />,
            index: true
          }, {
            path: 'report',
            element: <ReportPage />,
            index: true
          }, {
            path: 'manage',
            element: <ManagePage />,
            index: true
          }, {
            path: 'settings',
            element: <SettingsPage />,
          }]
      }]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
