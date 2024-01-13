import { useAuth } from "../hooks/useAuth";

export function ReportPage() {
	const { user } = useAuth();

	return (
		<div>
			<h1>This is the Report page</h1>
			<p>current user: {user}</p>
		</div>
	);
}

