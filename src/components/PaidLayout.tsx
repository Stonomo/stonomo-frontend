import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useEffect } from "react"

export function PaidLayout() {
	const { isPaidUser } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isPaidUser()) {
			return navigate('/dashboard/subscribe')
		}
	})

	return (<Outlet />)
}