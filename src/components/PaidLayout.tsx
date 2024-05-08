import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Box, Button, Container } from "@mui/material";
import { useEffect } from "react";
import { NavBar } from "./NavBar";

export function PaidLayout() {
	const { isPaidUser, logout } = useAuth();
	const navigate = useNavigate();

	const buttonStyle = { color: 'white' }

	// useEffect(() => {
	// 	if (!isPaidUser()) {
	// 		return navigate('subscribe');
	// 	}
	// })

	return (
		<Box>
			<NavBar>
				<Button
					sx={buttonStyle}
					onClick={() => navigate('search')}>
					Search
				</Button>
				<Button
					sx={buttonStyle}
					onClick={() => navigate('report')}>
					Report
				</Button>
				<Button
					sx={buttonStyle}
					onClick={() => navigate('manage')}>
					Manage
				</Button>
				<Button
					sx={buttonStyle}
					onClick={() => navigate('profile')}>
					Profile
				</Button>
				<Button
					sx={buttonStyle}
					onClick={() => navigate('settings')}>
					Settings
				</Button>
			</NavBar>
			<Outlet />
		</Box >
	)
}