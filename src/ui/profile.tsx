import { useLoaderData } from "react-router";
import { Form, useFetcher } from "react-router-dom";
import {
	Button,
	Container,
	Stack,
	TextField,
	Typography
} from "@mui/material";
import { maskPhoneInput } from "../lib/handlers";
import { ChangeEvent, useEffect, useState } from "react";
import { profileFields } from "../lib/types";
import { Label } from "../lib/styled";


export function ProfilePage() {
	const profile = useLoaderData() as profileFields
	const [formData, setFormData] = useState({
		facilityName: profile.facilityName,
		facilityAddress: {
			street1: profile.facilityAddress.street1,
			street2: profile.facilityAddress.street2,
			city: profile.facilityAddress.city,
			state: profile.facilityAddress.state,
			zip: profile.facilityAddress.zip,
		},
		facilityPhone: profile.facilityPhone,
		facilityEmail: profile.facilityEmail
	})
	const [changed, setChanged] = useState(false)
	const fetcher = useFetcher()

	useEffect(() => {
		if (fetcher.state === "idle" && !fetcher.data) {
			fetcher.load('/dashboard/profile')
		}
		setChanged(!fetcher.data)
	}, [fetcher]);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setFormData({ ...formData, [e.target.name]: e.target.value })
		setChanged(true)
	}

	function resetValues() {
		setChanged(false)
		setFormData({
			facilityName: profile.facilityName,
			facilityAddress: {
				street1: profile.facilityAddress.street1,
				street2: profile.facilityAddress.street2,
				city: profile.facilityAddress.city,
				state: profile.facilityAddress.state,
				zip: profile.facilityAddress.zip,
			},
			facilityPhone: profile.facilityPhone,
			facilityEmail: profile.facilityEmail
		})
	}

	return (
		<Container sx={{
			bgcolor: 'primary.main',
			paddingBottom: 2,
			borderBottomLeftRadius: 5,
			borderBottomRightRadius: 5
		}}>
			<Container sx={{ bgcolor: 'white', borderRadius: 2, paddingBottom: 2 }}>
				<fetcher.Form method='PATCH' id='profileForm'>
					<Stack>
						<Typography variant='h5'>Facility Profile</Typography>
						<Label>Facility Name:</Label>
						<TextField
							id='facilityName'
							name='facilityName'
							onInput={handleChange}
							defaultValue={formData.facilityName}
							fullWidth
						/>
						<Label>Phone:</Label>
						<TextField
							id='phone'
							name='phone'
							onInput={handleChange}
							// onInput={maskPhoneInput}
							value={formData.facilityPhone}
							fullWidth
						/>
						<Label>Email:</Label>
						<TextField
							id='email'
							name='email'
							onInput={handleChange}
							defaultValue={formData.facilityEmail}
							fullWidth
						/>
						<Label>Address:</Label>
						<TextField
							id='street1'
							name='street1'
							onInput={handleChange}
							defaultValue={formData.facilityAddress.street1}
							placeholder="Street 1"
							fullWidth
						/>
						<TextField
							id='street2'
							name='street2'
							onInput={handleChange}
							defaultValue={formData.facilityAddress.street2}
							placeholder="Street 2"
							fullWidth
						/>
						<TextField
							id='city'
							name='city'
							onInput={handleChange}
							defaultValue={formData.facilityAddress.city}
							placeholder="City"
							fullWidth
						/>
						<TextField
							id='state'
							name='state'
							onInput={handleChange}
							defaultValue={formData.facilityAddress.state}
							placeholder="State"
							fullWidth
						/>
						<TextField
							id='zip'
							name='zip'
							onInput={handleChange}
							defaultValue={formData.facilityAddress.zip}
							placeholder="Zip"
							fullWidth
						/>
						{changed && <Container maxWidth='md'
							sx={{ textAlign: 'center', margin: 1 }}>
							<Button
								type='submit'
								// onClick={() => setChanged(false)}
								variant='contained'
							>Save Changes
							</Button>
							<Button
								type='reset'
								onClick={resetValues}
								variant='contained'
								color='warning'
							>Reset
							</Button>
						</Container>}
					</Stack>
				</fetcher.Form>
			</Container>
		</Container>
	);
}