import { useAuth } from "../hooks/useAuth";

export function SearchPage() {
	const { user } = useAuth();

	return (
		<div>
			<h1>This is the Search page</h1>
			<p>current user: {user}</p>
		</div>
	);
}