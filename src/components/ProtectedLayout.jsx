import { Navigate, Outlet, Link, Form } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedLayout = () => {
	const { user, token, logout } = useAuth();

	if (!user) {
		return <Navigate to="/" />;
	}

	return (
		<div>
			<nav>
				<Link to="search">Search Evictions</Link>
				<Link to="report">Report Eviction</Link>
				<Form action='manage'>
					<input type='hidden'
						name='token'
						id='token'
						value={token} />
					<button
						type='submit'>
						Manage Reports
					</button>
				</Form>
				<Link to="settings">Settings</Link>
				<Link to="profile">Profile</Link>
				<Link to="/" onClick={logout}>Log Out</Link>
			</nav>
			<Outlet />
		</div>
	)
};