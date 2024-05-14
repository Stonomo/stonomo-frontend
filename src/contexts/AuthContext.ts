import { createContext } from 'react';

const contextProps = {
	isLoggedIn: (): boolean => { return false },
	isPaidUser: (): boolean => { return false },
	freeSearches: Number,
	fetchFreeSearches: (): void => { },
	userHasSearchAccess: (): boolean => { return false },
	login: (
		data: { username: any; password: any; },
		onFailCallback: ((() => PromiseLike<never> | void) | null)
	) => { },
	logout: () => { },
	currentUserId: (): (string | null) => { return null },
}

export const AuthContext = createContext(contextProps);