import { useAuth } from "../hooks/useAuth";

export function ConfirmPage() {
	const { user } = useAuth();

	return (
		<div>
			<h1>This is the Confirm page</h1>
			<p>current user: {user}</p>
		</div>
	);
}