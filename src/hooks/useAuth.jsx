import { createContext, useContext, useRef, useEffect } from 'react';
import { Outlet } from 'react-router';

const AuthContext = createContext({
	login: (username, password) => { },
	get: () => { },
	post: () => { },
	patch: () => { },
	del: () => { }
});

export const AuthProvider = ({ apiClient }) => {
	const accessTokenRef = useRef()
	// const refreshTokenRef = useRef()

	// useEffect(() => {
	// 	const requestInterceptor = apiClient.interceptors.request.use(
	// 		(request) => {
	// 			// Attach current access token ref value to outgoing request headers
	// 			request.headers["authorization"] = accessTokenRef.current;
	// 			return request;
	// 		},
	// 	);

	// 	const responseInterceptor = apiClient.interceptors.response.use(
	// 		(response) => {
	// 			// Cache new token from incoming response headers
	// 			accessTokenRef.current = response.headers["access-token"];
	// 			return response;
	// 		},
	// 	);

	// 	// Return cleanup function to remove interceptors if apiClient updates
	// 	return () => {
	// 		apiClient.interceptors.request.eject(requestInterceptor);
	// 		apiClient.interceptors.response.eject(responseInterceptor);
	// 	};
	// }, [apiClient]);

	// call this function when you want to authenticate the user
	const login = async (username, password, onFailCallback) => {
		const response = await apiClient.post('/login',
			{ username: username, password: password }
		)
		if (!response.ok) {
			onFailCallback();
		}
		navigate('/dashboard/profile', { replace: true });
	};

	const isLoggedIn = () => {
		return accessTokenRef.current !== ''
	}

	const context = {
		login,
		isLoggedIn,
		get: apiClient.get,
		post: apiClient.post,
		patch: apiClient.patch,
		del: apiClient.delete
	}

	return (
		<AuthContext.Provider value={context}>
			<Outlet />
		</AuthContext.Provider>
	)
};

export const useAuth = () => {
	return useContext(AuthContext);
}