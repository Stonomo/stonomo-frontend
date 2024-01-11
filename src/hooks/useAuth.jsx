import { createContext, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useLocalStorage("user", null);
	const navigate = useNavigate();

	// call this function when you want to authenticate the user
	const login = async (data) => {
		// TODO call fetchToken
		setUser(data.username);
		navigate("/dashboard/profile", { replace: true });
	};

	// call this function to sign out logged in user
	const logout = () => {
		setUser(null);
		navigate("/", { replace: true });
	};

	const loginCallback = useCallback(login, [login])
	const logoutCallback = useCallback(logout, [logout])
	const value = useMemo(
		() => ({
			user,
			login: loginCallback,
			logout: logoutCallback
		}),
		[user, loginCallback, logoutCallback]
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};