import { JwtPayload } from 'jwt-decode';
import { createContext } from 'react';

const contextProps = {
	isLoggedIn: (): boolean => { return false },
	login: (
		data: { username: any; password: any; },
		onFailCallback: ((() => PromiseLike<never> | void) | null)
	) => { },
	logout: () => { },
	currentUserId: (): (string | null) => { return null },
	currentUserName: (): (string | null) => { return null },
}

export const AuthContext = createContext(contextProps);