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
import { ReportPage } from './dashboard/report'
import { SettingsPage } from './dashboard/settings'
import { ManagePage, loader as manageLoader } from './dashboard/manage'
import { Eviction, action as evictionAction } from './routes/eviction'
import { ConfirmPage } from './dashboard/confirm'
import { ResultsPage, loader as resultsLoader } from './dashboard/results'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import './index.css'
import '@fontsource/roboto/300.css'

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
            path: 'report',
            element: <ReportPage />,
            // action: reportAction,
            children: [
              {
                path: 'confirm',
                element: <ConfirmPage />,
                // action: confirmAction
              }]
          }, {
            path: 'manage/:token',
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
      <Container maxWidth='xl'>
        <Container maxWidth='md'>
          <CssBaseline />
          <RouterProvider router={router} />
        </Container>
      </Container>
    </ThemeProvider>
  </StrictMode >,
)
