import { useOutlet } from "react-router-dom";
import { AuthProvider } from "../providers/AuthProvider";

export const AuthLayout = (props: any) => {
	const outlet = useOutlet();

	return (
		<AuthProvider>{outlet}</AuthProvider>
	);
};