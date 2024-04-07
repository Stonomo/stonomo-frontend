import { useAuth } from "../hooks/useAuth";

export function HomePage() {
	const { isLoggedIn } = useAuth();

	return (
		<div>
			<h1>This is the Home Page</h1>
		</div>
	);
}