import { Navigate, Outlet, Link, Form, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar, Button, Container, Toolbar } from "@mui/material";
import { useEffect } from "react";

export const ProtectedLayout = () => {
	const { user, token, logout } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			return navigate('/');
		}
	})

	return (
		<Container>
			<Toolbar disableGutters>
				<Button onClick={() => navigate('search')}>Search Evictions</Button>
				<Button onClick={() => navigate('report/' + token)}>Report Eviction</Button>
				<Button onClick={() => navigate('manage/' + token)}>Manage Reports</Button>
				<Button onClick={() => navigate('profile')}>Profile</Button>
				<Button onClick={() => navigate('profile/settings')}>Settings</Button>
				<Button onClick={() => { logout(); navigate('/') }}>Log Out</Button>
			</Toolbar>
			<Outlet />
		</Container >
	)
};