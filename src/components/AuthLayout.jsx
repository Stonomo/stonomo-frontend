import { Outlet } from "react-router-dom";
import { AuthProvider } from "../hooks/useAuth";

export const AuthLayout = ({ apiClient }) => {
	return (
		<AuthProvider apiClient={apiClient}>
			<Outlet />
		</AuthProvider>
	);
};