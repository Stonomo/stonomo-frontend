import { Outlet, useNavigate } from "react-router-dom";
import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import { NavBar } from "./NavBar";
import { useAuth } from "../hooks/useAuth";

export const HomeLayout = () => {
	const { isLoggedIn } = useAuth()
	const navigate = useNavigate()

	const buttonStyle = { color: 'white' }

	// useEffect(() => {
	// 	if (isLoggedIn) {
	// 		return navigate('/dashboard/profile')
	// 	}
	// })

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