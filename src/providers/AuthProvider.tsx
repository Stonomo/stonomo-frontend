import {
	useCallback,
	useEffect,
	useMemo,
	useRef
} from 'react'
import {
	Outlet,
	useNavigate
} from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from '../contexts/AuthContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { accessTokenFields, refreshTokenFields } from '../lib/types'

const stonomo_api_url = import.meta.env.VITE_STONOMO_API_URL || process.env.STONOMO_API_URL
const users_url = stonomo_api_url + 'users/'

export const AuthProvider = (props: any) => {
	const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken', '')
	const [accessToken, setAccessToken] = useLocalStorage('accessToken', '')
	const [freeSearches, setFreeSearches] = useLocalStorage('freeSearches', 0)
	const navigate = useNavigate()

	useEffect(() => {
		if (refreshToken) {
			handleRefreshToken()
		}
	})

	let tokenExpiration: number
	const handleRefreshToken = async () => {
		try {
			// Decode the access token to get its expiration time
			if (!tokenExpiration) {
				tokenExpiration = (jwtDecode(accessToken) as accessTokenFields).exp
			}
			const currentTime = Date.now() / 1000 // Convert to seconds

			// Calculate the time difference between current time and expiration time
			const timeUntilExpiration = tokenExpiration - currentTime

			// Refresh the token only if it's about to expire (e.g., within 5 minutes)
			if (timeUntilExpiration < 300) {
				const response = await fetch(stonomo_api_url + 'refresh-token', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						refreshToken,
					}),
				})

				const data = await response.json()

				setAccessToken(data.accessToken)
				setRefreshToken(data.refreshToken)
			}
		} catch (error) {
			console.error('Error refreshing token:', error)
		}
	}

	const login = (data: { username: any, password: any }, onFailCallback: (() => PromiseLike<never> | void) | null) => {
		fetch(stonomo_api_url + 'login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				username: data.username,
				password: data.password
			})
		})
			.then(async (response) => {
				if (!response.ok) {
					throw new Error('HTTP status ' + response.status)
				}
				// decode and cache refresh token from response
				response.json().then(({ accessToken: auth, refreshToken: refresh }) => {
					setRefreshToken(refresh)
					setAccessToken(auth)
					fetchFreeSearches().then(() => {
						navigate('/dashboard/search', { replace: true })
					})
				})
			}).catch(onFailCallback)
	}

	const isLoggedIn = (): boolean => {
		if (!refreshToken || refreshToken === undefined || refreshToken === '') {
			return false
		}
		const expiresAt = (jwtDecode(refreshToken) as refreshTokenFields).exp
		const now = Math.floor(new Date().getTime() / 1000)
		const valid = now < expiresAt
		return valid
	}

	const isPaidUser = (): boolean => {
		if (!isLoggedIn()) { return false }
		const plan = (jwtDecode(accessToken) as accessTokenFields).plan
		return plan === 'PAID'
	}

	const fetchFreeSearches = async (): Promise<void> => {
		return fetch(users_url + 'get-free-searches', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				accessToken
			})
		})
			.then(async (response) => {
				if (!response.ok) {
					throw new Error('HTTP status ' + response.status)
				}
				// decode and cache refresh token from response
				response.json().then((data) => {
					setFreeSearches(data)
				})
			}).catch(console.error)
	}

	const userHasFreeSearches = (): boolean => {
		return freeSearches > 0
	}

	const userHasSearchAccess = (): boolean => {
		if (isPaidUser() || userHasFreeSearches()) {
			return true
		}
		return false
	}

	const logout = () => {
		setRefreshToken('')
		setAccessToken('')
		navigate('/', { replace: true })
	}

	const getLoggedInUserId = (): (string | null) => {
		return accessToken ? (jwtDecode(accessToken) as accessTokenFields).id : null
	}

	const loginCallback = useCallback(login, [login])
	const logoutCallback = useCallback(logout, [logout])
	const isLoggedInCallback = useCallback(isLoggedIn, [isLoggedIn])
	const isPaidUserCallback = useCallback(isPaidUser, [isPaidUser])
	const fetchFreeSearchesCallback = useCallback(fetchFreeSearches, [fetchFreeSearches])
	const userHasSearchAccessCallback = useCallback(userHasSearchAccess, [userHasSearchAccess])
	const getLoggedInUserIdCallback = useCallback(getLoggedInUserId, [getLoggedInUserId])

	const value = useMemo(
		() => ({
			isLoggedIn: isLoggedInCallback,
			isPaidUser: isPaidUserCallback,
			freeSearches,
			fetchFreeSearches: fetchFreeSearchesCallback,
			userHasSearchAccess: userHasSearchAccessCallback,
			login: loginCallback,
			logout: logoutCallback,
			currentUserId: getLoggedInUserIdCallback,
		}),
		[
			isLoggedInCallback,
			isPaidUserCallback,
			freeSearches,
			fetchFreeSearchesCallback,
			userHasSearchAccessCallback,
			loginCallback,
			logoutCallback,
			getLoggedInUserIdCallback,
		]
	)
	return (
		<AuthContext.Provider value={value}>
			<Outlet />
		</AuthContext.Provider>
	)
}