import { useAuth } from "../hooks/useAuth";

export function HomePage() {
	const { user } = useAuth();

	return (
		<div>
			<h1>This is the Home Page</h1>
			<p>current user: {user}</p>
		</div>
	);
}