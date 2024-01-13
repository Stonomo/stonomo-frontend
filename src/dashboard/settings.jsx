import { useAuth } from "../hooks/useAuth";

export function SettingsPage() {
	const { user } = useAuth();

	return (
		<div>
			<h1>This is the Settings page</h1>
			<p>current user: {user}</p>
		</div>
	);
}