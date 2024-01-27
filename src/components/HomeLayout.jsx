import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { useEffect } from "react";

export const HomeLayout = () => {
	const { user } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (user) {
			return navigate('/dashboard/profile')
		}
	})

	return (
		<Container>
			<Toolbar disableGutters>
				<Button onClick={() => navigate('/')}>Home</Button>
				<Button onClick={() => navigate('/login')}>Login</Button>
			</Toolbar>
			<Outlet />
		</Container>
	)
};