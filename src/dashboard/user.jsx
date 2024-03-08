import { Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Container } from "@mui/material";

export function UserPage() {
	const { isLoggedIn } = useAuth();

	return (
		<Container sx={{ bgcolor: 'primary.main', borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
			<Container sx={{ bgcolor: 'white', borderRadius: 2 }}>
				<h1>This is the User Page</h1>
				<p>Logged in = {isLoggedIn().toString()}</p>
				<Outlet />
			</Container>
		</Container>
	);
}