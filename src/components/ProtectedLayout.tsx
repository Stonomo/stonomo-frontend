import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Box, Button, Container } from "@mui/material"
import { useEffect } from "react"
import { NavBar } from "./NavBar"
import { LockOutlined } from "@mui/icons-material"

export function ProtectedLayout() {
	const { isLoggedIn, isPaidUser } = useAuth()
	const navigate = useNavigate()

	const buttonStyle = { color: 'white' }

	useEffect(() => {
		if (!isLoggedIn()) {
			return navigate('/login')
		}
	})

	const locked = isPaidUser() ? <LockOutlined /> : ''

	return (
		<Box>
			<NavBar>
				<Button
					sx={buttonStyle}
					onClick={() => navigate('search')}>
					Search {locked}
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