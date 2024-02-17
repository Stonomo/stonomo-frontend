import { Navigate, Outlet, Link, Form, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar, Button, Container, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { NavBar } from "./NavBar";

export function ProtectedLayout() {
	const { isLoggedIn, logout } = useAuth();
	const navigate = useNavigate();

	const buttonStyle = { color: 'white' }

	useEffect(() => {
		if (!isLoggedIn()) {
			return navigate('/login');
		}
	})

	return (
		<Container>
			<NavBar>
				<Button
					sx={buttonStyle}
					onClick={() => navigate('search')}>
					Search Evictions
				</Button>
				<Button
					sx={buttonStyle}
					onClick={() => navigate('report')}>
					Report Eviction
				</Button>
				<Button
					sx={buttonStyle}
					onClick={() => navigate('manage')}>
					Manage Reports
				</Button>
				<Button
					sx={buttonStyle}
					onClick={() => navigate('profile')}>
					Profile
				</Button>
				<Button
					sx={buttonStyle}
					onClick={() => navigate('profile/settings')}>
					Settings
				</Button>
				<Button
					sx={buttonStyle}
					onClick={() => { logout(); navigate('/') }}>
					Log Out
				</Button>
			</NavBar>
			<Outlet />
		</Container >
	)
};