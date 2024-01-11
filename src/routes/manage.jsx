import { useAuth } from "../hooks/useAuth";

export function ManagePage() {
	const { user } = useAuth();

	return (
		<div>
			<h1>This is the Manage page</h1>
			<p>current user: {user}</p>
		</div>
	);
}