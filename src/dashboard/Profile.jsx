import { useAuth } from "../hooks/useAuth";

export function ProfilePage() {
	const { user, token } = useAuth();

	return (
		<div>
			<h1>This is the Profile Page</h1>
			<p>current user: {user}</p>
			<p>token: {token}</p>
		</div>
	);
}