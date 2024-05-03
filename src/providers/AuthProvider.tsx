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

const stonomo_api_url = import.meta.env.VITE_STONOMO_API_URL || process.env.STONOMO_API_URL

export const AuthProvider = (props: any) => {
	const refreshToken = useRef<any>()
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
					console.log(refreshToken.current)
					navigate('/dashboard/search', { replace: true })
				});
			}).catch(onFailCallback)
	}

	const isLoggedIn = (): boolean => {
		if (!refreshToken.current || refreshToken.current === undefined || refreshToken.current === '') {
			return false
		}
		const expiresAt = refreshToken.current.exp
		return Date.now() > expiresAt
	}

	const isPaidUser = (): boolean => {
		if (!isLoggedIn()) { return false }
		const plan = refreshToken.current.plan
		return plan !== 'FREE'
	}

	const logout = () => {
		refreshToken.current = useRef().current
		navigate('/', { replace: true })
	}

	const getLoggedInUserId = (): (string | null) => {
		return refreshToken.current ? refreshToken.current.id : null
	}

	const getLoggedInUserName = (): (string | null) => {
		return refreshToken.current ? refreshToken.current.name : null
	}

	const loginCallback = useCallback(login, [login])
	const logoutCallback = useCallback(logout, [logout])
	const isLoggedInCallback = useCallback(isLoggedIn, [isLoggedIn])
	const isPaidUserCallback = useCallback(isPaidUser, [isPaidUser])
	const getLoggedInUserIdCallback = useCallback(getLoggedInUserId, [getLoggedInUserId])
	const getLoggedInUserNameCallback = useCallback(getLoggedInUserName, [getLoggedInUserName])

	const value = useMemo(
		() => ({
			isLoggedIn: isLoggedInCallback,
			isPaidUser: isPaidUserCallback,
			login: loginCallback,
			logout: logoutCallback,
			currentUserId: getLoggedInUserIdCallback,
			currentUserName: getLoggedInUserNameCallback
		}),
		[isLoggedInCallback, isPaidUserCallback, loginCallback, logoutCallback, getLoggedInUserIdCallback, getLoggedInUserNameCallback]
	);
	return (
		<AuthContext.Provider value={value}>
			<Outlet />
		</AuthContext.Provider>
	);
};