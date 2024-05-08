import {
	Box,
	Container,
	Typography
} from "@mui/material";

export function SubscribePage() {
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
				<Box sx={{ width: '100%', textAlign: 'center' }}>
					<Typography variant='h5'>
						Subscribe for Premium features
					</Typography>
				</Box>
				<Typography>Contact us to learn more.</Typography>
			</Container>
		</Container>
	)
}