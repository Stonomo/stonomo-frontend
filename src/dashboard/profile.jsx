import { Outlet } from "react-router";

export function ProfilePage() {

	return (
		<div>
			<h1>This is the Profile Page</h1>
			<Outlet />
		</div>
	);
}