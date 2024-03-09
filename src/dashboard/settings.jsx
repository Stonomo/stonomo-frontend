import { Container, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

export function SettingsPage() {
	const { isLoggedIn } = useAuth();

	return (
		<Container
			sx={{
				bgcolor: 'primary.main',
				paddingBottom: 2,
				borderBottomLeftRadius: 5,
				borderBottomRightRadius: 5
			}}
		>
			<Container sx={{ bgcolor: 'white', borderRadius: 2 }}>
				<Typography variant='h3'>This is the Settings page</Typography>
			</Container>
		</Container>
	);
}