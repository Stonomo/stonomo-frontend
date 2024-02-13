import { Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function ProfilePage() {
	const { isLoggedIn } = useAuth();

	return (
		<div>
			<h1>This is the Profile Page</h1>
			<p>Logged in = {isLoggedIn().toString()}</p>
			<Outlet />
		</div>
	);
}