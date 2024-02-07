import {
	AppBar,
	Container,
	Toolbar
} from "@mui/material";
import { Outlet } from "react-router";

export function NavBar({ children }) {
	return (
		<AppBar position="static">
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					{children}
				</Toolbar>
			</Container>
		</AppBar>
	)
}