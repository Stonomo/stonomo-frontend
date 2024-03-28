import { Container, Unstable_Grid2 as Grid, Stack, Typography, styled } from "@mui/material";
import { useLoaderData } from "react-router";

const Label = styled(Typography)({
	textAlign: 'right',
	height: '100%',
	width: '100%',
	padding: '10px'
})

const Content = styled(Typography)({
	textAlign: 'left',
	height: '100%',
	width: '100%',
	paddingTop: '15px'
})

export function UserPage() {
	const userData = useLoaderData()
	const address = userData.facilityAddress

	return (
		<Container sx={{
			bgcolor: 'primary.main',
			paddingBottom: 2,
			borderBottomLeftRadius: 5,
			borderBottomRightRadius: 5
		}}>
			<Container sx={{ bgcolor: 'white', borderRadius: 2 }}>
				<Stack>
					<Grid container>
						<Grid xs={4}>
							<Label variant='h5'>Facility Name:</Label>
						</Grid>
						<Grid xs={8}>
							<Content>{userData.facilityName}</Content>
						</Grid>
					</Grid>
					<Grid container>
						<Grid xs={4}>
							<Label variant='h5'>Address:</Label>
						</Grid>
						<Grid xs={8}>
							<Content>{`${address.street1} ${address.city}, ${address.state} ${address.zip}`}</Content>
						</Grid>
					</Grid>
					<Grid container>
						<Grid xs={4}>
							<Label variant='h5'>Phone:</Label>
						</Grid>
						<Grid xs={8}>
							<Content>{userData.facilityPhone}</Content>
						</Grid>
					</Grid>
					<Grid container>
						<Grid xs={4}>
							<Label variant='h5'>Email:</Label>
						</Grid>
						<Grid xs={8}>
							<Content>{userData.facilityEmail}</Content>
						</Grid>
					</Grid>
				</Stack>
			</Container>
		</Container>
	);
}