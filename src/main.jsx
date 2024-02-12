// import 'dotenv/config'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  CssBaseline,
  ThemeProvider
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthLayout } from './components/AuthLayout'
import { HomeLayout } from './components/HomeLayout'
import { ProtectedLayout } from './components/ProtectedLayout'
import { HomePage } from './dashboard/home'
import { SignIn } from './dashboard/login'
import { ProfilePage } from './dashboard/profile'
import { SettingsPage } from './dashboard/settings'
import {
  SearchPage,
  action as searchAction
} from './dashboard/search'
import {
  ResultsPage,
  loader as resultsLoader
} from './dashboard/results'
import {
  ReportPage,
  loader as reportLoader,
  action as reportAction
} from './dashboard/report'
import {
  ConfirmPage,
  loader as confirmLoader,
  action as confirmAction
} from './dashboard/confirm'
import {
  ManagePage,
  loader as manageLoader
} from './dashboard/manage'
import {
  Eviction,
  action as evictionAction
} from './routes/eviction'

import '@fontsource/roboto/300.css'
import theme from './theme'

const STONOMO_URL = 'http://localhost:7867'
const STONOMO_API_URL = STONOMO_URL + '/v1/'

const apiClient = axios.create({
  baseUrl: STONOMO_API_URL,
  headers: {
    "Content-Type": "application/json"
  },
})

const router = createBrowserRouter([
  {
    element: <AuthLayout apiClient={apiClient} />,
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
            children: [
              {
                path: 'settings',
                element: <SettingsPage />,
              }]
          }, {
            path: 'search',
            element: <SearchPage />,
            action: searchAction,
            children: [
              {
                path: 'results/:q',
                element: <ResultsPage />,
                loader: resultsLoader(apiClient),
              }]
          }, {
            path: 'report',
            element: <ReportPage />,
            loader: reportLoader(apiClient),
            action: reportAction(apiClient),
          }, {
            path: 'confirm/:confirmId',
            element: <ConfirmPage />,
            loader: confirmLoader(apiClient),
            action: confirmAction(apiClient),
          }, {
            path: 'manage/:docId?',
            element: <ManagePage />,
            loader: manageLoader(apiClient),
            children: [
              {
                path: 'eviction',
                element: <Eviction />,
                action: evictionAction(apiClient),
              }
            ]
          }]
      }]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container maxWidth='xl'>
          <Container maxWidth='md'>
            <CssBaseline />
            <RouterProvider router={router} />
          </Container>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode >,
)
