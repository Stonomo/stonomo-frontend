import { Container, Unstable_Grid2 as Grid, Stack, TextField, Typography, styled } from "@mui/material";
import { useLoaderData } from "react-router";
import { profileFields } from "../lib/types";
import { Content, Label } from "../lib/styled";

export function UserPage() {
	const userData = useLoaderData() as profileFields
	const address = userData.facilityAddress

	return (
		<Container sx={{
			bgcolor: 'primary.main',
			paddingBottom: 2,
			borderBottomLeftRadius: 5,
			borderBottomRightRadius: 5
		}}>
			<Container sx={{ bgcolor: 'white', paddingBottom: 2, borderRadius: 2 }}>
				<Stack>
					<Label>Facility Name:</Label>
					<Content>{userData.facilityName}</Content>
					<Label>Address:</Label>
					<Typography paddingLeft='5px'>{address.street1}
						{address.street2 && (<br />)}{address.street2}
						{address.street3 && (<br />)}{address.street3}
						<br />{address.city}, {address.state} {address.zip}</Typography>
					<Label>Phone:</Label>
					<Content>{userData.facilityPhone}</Content>
					<Label>Email:</Label>
					<Content>{userData.facilityEmail}</Content>
				</Stack>
			</Container>
		</Container>
	);
}