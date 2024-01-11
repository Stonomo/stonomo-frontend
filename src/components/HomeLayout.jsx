import { Navigate, Outlet, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const HomeLayout = () => {
	const { user } = useAuth();

	if (user) {
		return <Navigate to="/dashboard/profile" />;
	}

	return (
		<div className="HomeLayout">
			<div className="header">
				<div className="title">Stonomo</div>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/login">Login</Link>
				</nav>
			</div>
			<Outlet />
		</div>
	)
};