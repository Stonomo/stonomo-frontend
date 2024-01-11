import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './components/AuthLayout'
import { HomeLayout } from './components/HomeLayout'
import { ProtectedLayout } from './components/ProtectedLayout'
import { HomePage } from './pages/Home'
import { SignIn } from './routes/login'
import { ProfilePage } from './pages/Profile'
import { SearchPage } from './routes/search'
import { ReportPage } from './routes/report'
import { SettingsPage } from './routes/settings'
import { ManagePage } from './routes/manage'
import { ConfirmPage } from './routes/confirm'
import { ResultsPage } from './routes/results'
import './index.css'

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
            path: 'results',
            element: <ResultsPage />,
          }, {
            path: 'report',
            element: <ReportPage />,
          }, {
            path: 'confirm',
            element: <ConfirmPage />,
          }, {
            path: 'manage',
            element: <ManagePage />,
          }, {
            path: 'settings',
            element: <SettingsPage />,
          }]
      }]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
