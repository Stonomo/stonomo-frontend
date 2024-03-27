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
import { EvictionPage } from './dashboard/evictionPage'
import {
	confirmLoader,
	evictionLoader,
	manageLoader,
	manageResultsLoader,
	profileLoader,
	reportLoader,
	resultsLoader,
	userLoader
} from './scripts/loaders'
import {
	confirmAction,
	evictionAction,
	reportAction,
	searchAction,
	searchManageAction
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
						path: 'search',
						element: <SearchPage />,
						action: searchAction,
						children: [
							{
								path: 'results',
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
						path: 'manage',
						element: <ManagePage />,
						action: searchManageAction,
						children: [{
							path: 'results',
							element: <ResultsPage managePage={true} />,
							loader: manageResultsLoader,
						}]
					}, {
						path: 'eviction/:evictionId',
						element: <EvictionPage />,
						loader: evictionLoader,
						action: evictionAction,
					}, {
						path: 'user/:userId',
						element: <UserPage />,
						loader: userLoader
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
