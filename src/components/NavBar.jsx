import {
	AppBar,
	Container,
	Toolbar
} from "@mui/material";

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