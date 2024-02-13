import { useAuth } from "../hooks/useAuth";

export function SettingsPage() {
	const { isLoggedIn } = useAuth();

	return (
		<div>
			<h1>This is the Settings page</h1>
			<p>Logged in = {isLoggedIn().toString()}</p>
		</div>
	);
}