// import 'dotenv/config'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './components/AuthLayout'
import { HomeLayout } from './components/HomeLayout'
import { ProtectedLayout } from './components/ProtectedLayout'
import { HomePage } from './dashboard/home'
import { SignIn } from './dashboard/login'
import { ProfilePage } from './dashboard/profile'
import { SearchPage, action as searchAction } from './dashboard/search'
import { ReportPage, loader as reportLoader, action as reportAction } from './dashboard/report'
import { SettingsPage } from './dashboard/settings'
import { ManagePage, loader as manageLoader } from './dashboard/manage'
import { Eviction, action as evictionAction } from './routes/eviction'
import { ConfirmPage, loader as confirmLoader, action as confirmAction } from './dashboard/confirm'
import { ResultsPage, loader as resultsLoader } from './dashboard/results'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import './index.css'
import '@fontsource/roboto/300.css'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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
                path: 'results/:q/:token',
                element: <ResultsPage />,
                loader: resultsLoader,
              }]
          }, {
            path: 'report/:token',
            element: <ReportPage />,
            loader: reportLoader,
            action: reportAction,
          }, {
            path: 'confirm/:confirmId/:token',
            element: <ConfirmPage />,
            loader: confirmLoader,
            action: confirmAction,
          }, {
            path: 'manage/:token/:docId?',
            element: <ManagePage />,
            loader: manageLoader,
            children: [
              {
                path: 'eviction',
                element: <Eviction />,
                action: evictionAction,
              }
            ]
          }]
      }]
  }
]);

const theme = createTheme();

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
