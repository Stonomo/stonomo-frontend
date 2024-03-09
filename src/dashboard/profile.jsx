import { useLoaderData } from "react-router";
import { Form } from "react-router-dom";
import {
	Button,
	Container,
	Unstable_Grid2 as Grid,
	Stack,
	TextField,
	Typography,
	styled
} from "@mui/material";
import { maskPhoneInput } from "../scripts/handlers";
import { useState } from "react";

const Label = styled(Typography)({
	textAlign: 'right',
	height: '100%',
	width: '100%',
	padding: '10px'
})

export function ProfilePage() {
	const profile = useLoaderData()
	const [formData, setFormData] = useState({
		facilityName: profile.facilityName,
		facilityAddress: profile.facilityAddress,
		facilityPhone: profile.facilityPhone,
		facilityEmail: profile.facilityEmail
	})
	const [changed, setChanged] = useState(false)

	function handleChange(e) {
		setFormData(({ ...formData, [e.target.name]: e.target.value }))
		setChanged(true)
	}

	return (
		<Container sx={{
			bgcolor: 'primary.main',
			paddingBottom: 2,
			borderBottomLeftRadius: 5,
			borderBottomRightRadius: 5
		}}>
			<Container sx={{ bgcolor: 'white', borderRadius: 2 }}>
				<Form method='POST'>
					<Stack>
						<Grid container>
							<Grid xs={4}>
								<Label variant='h5'>Facility Name:</Label>
							</Grid>
							<Grid xs={8}>
								<TextField
									onChange={handleChange}
									defaultValue={formData.facilityName}
									fullWidth
								/>
							</Grid>
						</Grid>
						<Grid container>
							<Grid xs={4}>
								<Label variant='h5'>Address:</Label>
							</Grid>
							<Grid xs={8}>
								<TextField
									onChange={handleChange}
									defaultValue={formData.facilityAddress}
									fullWidth
								/>
							</Grid>
						</Grid>
						<Grid container>
							<Grid xs={4}>
								<Label variant='h5'>Phone:</Label>
							</Grid>
							<Grid xs={8}>
								<TextField
									onChange={handleChange}
									onInput={maskPhoneInput}
									defaultValue={formData.facilityPhone}
									fullWidth
								/>
							</Grid>
						</Grid>
						<Grid container>
							<Grid xs={4}>
								<Label variant='h5'>Email:</Label>
							</Grid>
							<Grid xs={8}>
								<TextField
									onChange={handleChange}
									defaultValue={formData.facilityEmail}
									fullWidth
								/>
							</Grid>
						</Grid>
						{changed && <Container direction='row' maxWidth='md'
							sx={{ textAlign: 'center', margin: 1 }}>
							<Button
								type='submit'
								variant='contained'
							>Save Changes
							</Button>
							<Button
								type='reset'
								variant='contained'
								color='warning'
							>Reset
							</Button>
						</Container>}
					</Stack>
				</Form>
			</Container>
		</Container>
	);
}