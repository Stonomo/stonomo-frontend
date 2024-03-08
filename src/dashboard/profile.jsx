import { useLoaderData } from "react-router";
import { Container, Grid, Stack, TextField } from "@mui/material";
import { getProfile } from "../scripts/users";
import { Form } from "react-router-dom";

export function ProfilePage() {
	const profile = useLoaderData()

	return (
		<Container sx={{ bgcolor: 'primary.main', borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
			<Container sx={{ bgcolor: 'white', borderRadius: 2, marginTop: 2 }}>
				<Form method='POST'>
					<Stack>
						<Grid container>
							<Grid xs={4}>Facility Name</Grid>
							<Grid xs={8}>
								<TextField value={profile.facilityName} fullWidth />
							</Grid>
						</Grid>
						<Grid container>
							<Grid xs={4}>Address</Grid>
							<Grid xs={8}>
								<TextField value={profile.facilityAddress} fullWidth />
							</Grid>
						</Grid>
						<Grid container>
							<Grid xs={4}>Phone</Grid>
							<Grid xs={8}>
								<TextField value={profile.facilityPhone} fullWidth />
							</Grid>
						</Grid>
						<Grid container>
							<Grid xs={4}>Email</Grid>
							<Grid xs={8}>
								<TextField value={profile.facilityEmail} fullWidth />
							</Grid>
						</Grid>
					</Stack>
				</Form>
			</Container>
		</Container>
	);
}