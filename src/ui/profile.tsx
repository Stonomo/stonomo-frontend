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
import { maskPhoneInput } from "../lib/handlers";
import { ChangeEvent, FormEvent, useState } from "react";
import { profileFields } from "../lib/types";
import { Label } from "../lib/styled";


export function ProfilePage() {
	const profile = useLoaderData() as profileFields
	const [formData, setFormData] = useState({
		facilityName: profile.facilityName,
		facilityAddress: profile.facilityAddress,
		facilityPhone: profile.facilityPhone,
		facilityEmail: profile.facilityEmail
	})
	const [changed, setChanged] = useState(false)

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
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
			<Container sx={{ bgcolor: 'white', borderRadius: 2, paddingBottom: 2 }}>
				<Form method='POST'>
					<Stack>
						<Label>Facility Name:</Label>
						<TextField
							onChange={handleChange}
							defaultValue={formData.facilityName}
							fullWidth
						/>
						<Label>Address:</Label>
						<TextField
							id='street1'
							onChange={handleChange}
							defaultValue={formData.facilityAddress.street1}
							placeholder="Street 1"
							fullWidth
						/>
						<TextField
							id='street2'
							onChange={handleChange}
							defaultValue={formData.facilityAddress.street2}
							placeholder="Street 2"
							fullWidth
						/>
						<TextField
							id='street3'
							onChange={handleChange}
							defaultValue={formData.facilityAddress.street3}
							placeholder="Street 3"
							fullWidth
						/>
						<TextField
							id='city'
							onChange={handleChange}
							defaultValue={formData.facilityAddress.city}
							placeholder="City"
							fullWidth
						/>
						<TextField
							id='state'
							onChange={handleChange}
							defaultValue={formData.facilityAddress.state}
							placeholder="State"
							fullWidth
						/>
						<TextField
							id='zip'
							onChange={handleChange}
							defaultValue={formData.facilityAddress.zip}
							placeholder="Zip"
							fullWidth
						/>
						<Label>Phone:</Label>
						<TextField
							onChange={handleChange}
							onInput={maskPhoneInput}
							defaultValue={formData.facilityPhone}
							fullWidth
						/>
						<Label>Email:</Label>
						<TextField
							onChange={handleChange}
							defaultValue={formData.facilityEmail}
							fullWidth
						/>
						{changed && <Container maxWidth='md'
							sx={{ textAlign: 'center', margin: 1 }}>
							<Button
								type='submit'
								variant='contained'
							>Save Changes
							</Button>
							<Button
								type='reset'
								onClick={() => setChanged(false)}
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