import { useCallback, useMemo, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { AuthContext } from '../contexts/AuthContext';

export const AuthProvider = (props: any) => {
	const refreshToken = useRef<any>();
	const navigate = useNavigate();

	const login = (data: { username: any; password: any; }, onFailCallback: (() => PromiseLike<never> | void) | null) => {
		fetch(import.meta.env.VITE_STONOMO_API_URL + 'login', {
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
					navigate('/dashboard/search', { replace: true })
				});
			}).catch(onFailCallback);
	}

	const isLoggedIn = (): boolean => {
		if (!refreshToken.current || refreshToken.current === undefined || refreshToken.current === '') {
			return false
		}
		const expiresAt = refreshToken.current.exp
		return Date.now() > expiresAt
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
	const getLoggedInUserIdCallback = useCallback(getLoggedInUserId, [getLoggedInUserId])
	const getLoggedInUserNameCallback = useCallback(getLoggedInUserName, [getLoggedInUserName])
	const value = useMemo(
		() => ({
			isLoggedIn: isLoggedInCallback,
			login: loginCallback,
			logout: logoutCallback,
			currentUserId: getLoggedInUserIdCallback,
			currentUserName: getLoggedInUserNameCallback
		}),
		[isLoggedInCallback, loginCallback, logoutCallback, getLoggedInUserIdCallback, getLoggedInUserNameCallback]
	);
	return (
		<AuthContext.Provider value={value}>
			<Outlet />
		</AuthContext.Provider>
	);
};