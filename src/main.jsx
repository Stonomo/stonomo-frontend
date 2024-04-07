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
import { HomePage } from './ui/home'
import { SignIn } from './ui/login'
import { ProfilePage } from './ui/profile'
import { SettingsPage } from './ui/settings'
import { UserPage } from './ui/user'
import { SearchPage } from './ui/search'
import { ResultsPage } from './ui/results'
import { ReportPage } from './ui/report'
import { ConfirmPage } from './ui/confirm'
import { ManagePage } from './ui/manage'
import { Eviction } from './ui/eviction'
import {
	confirmLoader,
	evictionLoader,
	manageResultsLoader,
	profileLoader,
	reportLoader,
	resultsLoader,
	userLoader
} from './lib/loaders'
import {
	confirmAction,
	evictionAction,
	reportAction,
	searchAction,
	searchManageAction
} from './lib/actions'

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
								element: <ResultsPage managePage={false} />,
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
						element: <Eviction />,
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
				<Container maxWidth='md'>
					<CssBaseline />
					<RouterProvider router={router} />
				</Container>
			</LocalizationProvider>
		</ThemeProvider>
	</StrictMode >,
)
