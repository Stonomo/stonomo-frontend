import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { useEffect } from "react";

export const HomeLayout = () => {
	const { user } = useAuth()
	const navigate = useNavigate()

	const buttonStyle = { color: 'white' }

	useEffect(() => {
		if (user) {
			return navigate('/dashboard/profile')
		}
	})

	return (
		<Container>
			<Toolbar disableGutters >
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
			</Toolbar>
			<Outlet />
		</Container>
	)
};