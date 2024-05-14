import {
	useCallback,
	useMemo,
	useRef
} from 'react';
import {
	Outlet,
	useNavigate
} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from '../contexts/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

const stonomo_api_url = import.meta.env.VITE_STONOMO_API_URL || process.env.STONOMO_API_URL
const users_url = stonomo_api_url + 'users/'

export const AuthProvider = (props: any) => {
	const refreshToken = useRef<any>()
	const [freeSearches, setFreeSearches] = useLocalStorage('freeSearches', 0);
	const navigate = useNavigate()

	const login = (data: { username: any; password: any; }, onFailCallback: (() => PromiseLike<never> | void) | null) => {
		fetch(stonomo_api_url + 'login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ username: data.username, password: data.password })
		})
			.then(async (response) => {
				if (!response.ok) {
					throw new Error('HTTP status ' + response.status);
				}
				// decode and cache refresh token from response
				response.json().then((data) => {
					refreshToken.current = jwtDecode(data)
					fetchFreeSearches()
					navigate('/dashboard/search', { replace: true })
				})
			}).catch(onFailCallback)
	}

	const isLoggedIn = (): boolean => {
		if (!refreshToken.current || refreshToken.current === undefined || refreshToken.current === '') {
			return false
		}
		const expiresAt = refreshToken.current.exp
		const now = Math.floor(new Date().getTime() / 1000)
		const valid = now < expiresAt
		return valid
	}

	const isPaidUser = (): boolean => {
		if (!isLoggedIn()) { return false }
		const plan = refreshToken.current.plan
		return plan === 'PAID'
	}

	const fetchFreeSearches = (): void => {
		fetch(users_url + 'get-free-searches', {
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		})
			.then(async (response) => {
				if (!response.ok) {
					throw new Error('HTTP status ' + response.status);
				}
				// decode and cache refresh token from response
				response.json().then((data) => {
					setFreeSearches(data)
				});
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
		refreshToken.current = useRef().current
		navigate('/', { replace: true })
	}

	const getLoggedInUserId = (): (string | null) => {
		return refreshToken.current ? refreshToken.current.id : null
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
	);
	return (
		<AuthContext.Provider value={value}>
			<Outlet />
		</AuthContext.Provider>
	);
};