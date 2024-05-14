import {
	Outlet,
	useNavigate
} from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useEffect } from "react"

export function PaidLayout() {
	const { userHasSearchAccess } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!userHasSearchAccess()) {
			return navigate('/dashboard/subscribe')
		}
	})

	return (<Outlet />)
}