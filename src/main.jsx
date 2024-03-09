import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
	RouterProvider,
	createBrowserRouter
} from 'react-router-dom'
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
import { UserPage } from './dashboard/user'
import { SearchPage } from './dashboard/search'
import { ResultsPage } from './dashboard/results'
import { ReportPage } from './dashboard/report'
import { ConfirmPage } from './dashboard/confirm'
import { ManagePage } from './dashboard/manage'
import { Eviction } from './dashboard/eviction'
import {
	confirmLoader,
	manageLoader,
	profileLoader,
	reportLoader,
	resultsLoader,
	userLoader
} from './scripts/loaders'
import {
	confirmAction,
	evictionAction,
	reportAction,
	searchAction
} from './scripts/actions'

import '@fontsource/roboto/300.css'
import theme from './theme'

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
						loader: profileLoader,
					}, {
						path: 'settings',
						element: <SettingsPage />,
					}, {
						path: 'user/:username',
						element: <UserPage />,
						loader: userLoader
					}, {
						path: 'search',
						element: <SearchPage />,
						action: searchAction,
						children: [
							{
								path: 'results/:searchName/:searchPhone?/:searchEmail?',
								element: <ResultsPage />,
								loader: resultsLoader,
							}]
					}, {
						path: 'report',
						element: <ReportPage />,
						loader: reportLoader,
						action: reportAction,
					}, {
						path: 'confirm/:confirmId',
						element: <ConfirmPage />,
						loader: confirmLoader,
						action: confirmAction,
					}, {
						path: 'manage/:docId?',
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
