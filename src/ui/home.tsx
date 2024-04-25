import { useAuth } from "../hooks/useAuth";

export function HomePage() {
	const { isLoggedIn } = useAuth();

	return (
		<div>
			<h1>Stonomo</h1>
			<p>Where they will Sto' no mo'</p>
		</div>
	);
}