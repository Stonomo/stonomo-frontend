import { createContext, useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

const DEBUG = false;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useLocalStorage('user', null);
	const [userId, setUserId] = useLocalStorage('id', null);
	const [token, setToken] = useLocalStorage('token', null);
	const navigate = useNavigate();

	// Throws error if login fails, sets token if successful
	const fetchToken = (data, onFailCallback) => {
		fetch('http://localhost:7867/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: data.username, password: data.password })
		})
			.then(async (response) => {
				if (!response.ok) {
					throw new Error('HTTP status ' + response.status);
				}
				// console.log('HTTP status ' + response.status)
				const res = await response.json()
				const tkn = res['token']
				const userId = res['userId']
				// console.log(tkn);
				setToken(tkn);
				setUser(data.username);
				setUserId(userId)
				navigate('/dashboard/profile', { replace: true });
			}).catch(onFailCallback);
	};

	// call this function when you want to authenticate the user
	const login = (data, onFailCallback) => {
		if (DEBUG) {
			setUser(data.username);
			navigate('/dashboard/profile', { replace: true });
		}
		fetchToken(data, onFailCallback);
	};

	// call this function to sign out logged in user
	const logout = () => {
		setUser(null);
		navigate('/', { replace: true });
	};

	const loginCallback = useCallback(login, [login])
	const logoutCallback = useCallback(logout, [logout])
	const value = useMemo(
		() => ({
			user,
			userId,
			token,
			login: loginCallback,
			logout: logoutCallback
		}),
		[user, userId, token, loginCallback, logoutCallback]
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};