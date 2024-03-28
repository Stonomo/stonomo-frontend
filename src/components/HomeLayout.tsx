import { Outlet, useNavigate } from "react-router-dom";
import { Button, Container } from "@mui/material";
import { NavBar } from "./NavBar";

export const HomeLayout = () => {
	const navigate = useNavigate()

	const buttonStyle = { color: 'white' }

	return (
		<Container>
			<NavBar>
				<Button
					sx={buttonStyle}
					onClick={() => navigate('/')}
				>
					Home
				</Button>
				<Button
					sx={buttonStyle}
					onClick={() => navigate('/login')}
				>
					Login
				</Button>
			</NavBar>
			<Outlet />
		</Container>
	)
};