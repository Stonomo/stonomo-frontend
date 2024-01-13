import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './components/AuthLayout'
import { HomeLayout } from './components/HomeLayout'
import { ProtectedLayout } from './components/ProtectedLayout'
import { HomePage } from './dashboard/Home'
import { SignIn } from './routes/login'
import { ProfilePage } from './dashboard/Profile'
import {
  SearchPage,
  // action as searchAction
} from './dashboard/search'
import { ReportPage } from './dashboard/report'
import { SettingsPage } from './dashboard/settings'
import { ManagePage } from './dashboard/manage'
import { ConfirmPage } from './dashboard/confirm'
import { ResultsPage, loader as resultsLoader } from './dashboard/results'
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
            index: true
          }, {
            path: 'search',
            element: <SearchPage />,
            // action: searchAction,
          }, {
            path: 'results',
            element: <ResultsPage />,
            loader: resultsLoader,
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
