import { Container, Unstable_Grid2 as Grid, Stack, TextField, Typography, styled } from "@mui/material";
import { useLoaderData } from "react-router";
import { profileFields } from "../lib/types";

const Label = styled(Typography)({
	textAlign: 'left',
	height: '100%',
	width: '100%',
	paddingTop: '10px',
	fontWeight: 'bold'
})

const Content = styled(TextField)({
	textAlign: 'left',
	height: '100%',
	width: '100%',
})

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
					<Content disabled value={userData.facilityName} />
					<Label>Address:</Label>
					<Typography paddingLeft='5px'>{address.street1}
						{address.street2 && (<br />)}{address.street2}
						{address.street3 && (<br />)}{address.street3}
						<br />{address.city}, {address.state} {address.zip}</Typography>
					<Label>Phone:</Label>
					<Content disabled value={userData.facilityPhone} />
					<Label>Email:</Label>
					<Content disabled value={userData.facilityEmail} />
				</Stack>
			</Container>
		</Container>
	);
}