import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Box, Button, Container } from "@mui/material"
import { useEffect } from "react"
import { NavBar } from "./NavBar"

export function PaidLayout() {
	const { isPaidUser, logout } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isPaidUser()) {
			return navigate('subscribe')
		}
	})

	return (<Outlet />)
}