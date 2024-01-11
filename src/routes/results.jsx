import { useAuth } from "../hooks/useAuth";

export function ResultsPage() {
	const { user } = useAuth();

	return (
		<div>
			<h1>This is the Results page</h1>
			<p>current user: {user}</p>
		</div>
	);
}