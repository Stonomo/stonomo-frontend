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
		phone: profile.facilityPhone,
		email: profile.facilityEmail,
		street1: profile.facilityAddress.street1,
		street2: profile.facilityAddress.street2,
		city: profile.facilityAddress.city,
		state: profile.facilityAddress.state,
		zip: profile.facilityAddress.zip,
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
		setFormData(({ ...formData, [e.target.name]: e.target.value }))
		setChanged(true)
	}

	function resetValues() {
		setChanged(false)
		setFormData(({
			facilityName: profile.facilityName,
			phone: profile.facilityPhone,
			email: profile.facilityEmail,
			street1: profile.facilityAddress.street1,
			street2: profile.facilityAddress.street2,
			city: profile.facilityAddress.city,
			state: profile.facilityAddress.state,
			zip: profile.facilityAddress.zip,
		}))
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
						<Typography variant='h5'>Your Facility Profile:</Typography>
						<Label>Facility Name:</Label>
						<TextField
							id='facilityName'
							name='facilityName'
							onInput={handleChange}
							value={formData.facilityName}
							fullWidth
						/>
						<Label>Phone:</Label>
						<TextField
							id='phone'
							name='phone'
							onChange={handleChange}
							// onInput={maskPhoneInput}
							value={formData.phone}
							fullWidth
						/>
						<Label>Email:</Label>
						<TextField
							id='email'
							name='email'
							onInput={handleChange}
							value={formData.email}
							fullWidth
						/>
						<Label>Address:</Label>
						<TextField
							id='street1'
							name='street1'
							onInput={handleChange}
							value={formData.street1}
							placeholder="Street 1"
							fullWidth
						/>
						<TextField
							id='street2'
							name='street2'
							onInput={handleChange}
							value={formData.street2}
							placeholder="Street 2"
							fullWidth
						/>
						<TextField
							id='city'
							name='city'
							onInput={handleChange}
							value={formData.city}
							placeholder="City"
							fullWidth
						/>
						<TextField
							id='state'
							name='state'
							onInput={handleChange}
							value={formData.state}
							placeholder="State"
							fullWidth
						/>
						<TextField
							id='zip'
							name='zip'
							onInput={handleChange}
							value={formData.zip}
							placeholder="Zip"
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