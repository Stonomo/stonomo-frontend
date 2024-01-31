import { Button, Container, ListItem, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { Form, useParams } from "react-router-dom";
import { createEviction } from "../scripts/evictions";

export async function action({ params }) {
	// return await createEviction(params)
	return null
}

export function ConfirmPage() {
	const { user } = useAuth()
	const params = useParams()

	return (
		<Container>
			<Typography variant='h3'>
				Confirm Report
			</Typography>
			<Stack>
				<ListItem
					id='tenantName'
					name='tenantName'
					label='Tenant Name'
					margin='dense'
				>
					{params.name}
				</ListItem>
				<ListItem
					id='tenantPhone'
					name='tenantPhone'
					label='Tenant Phone'
					margin='dense'
				>
					{params.phone}
				</ListItem>
				<ListItem
					id='tenantEmail'
					name='tenantEmail'
					label='Tenant Email'
					margin='dense'
				>
					{params.email}
				</ListItem>
				<Form method='POST'>
					<input type='hidden' id='tenantName' value={params.name} />
					<input type='hidden' id='tenantPhone' value={params.phone} />
					<input type='hidden' id='tenantEmail' value={params.email} />
					<input type='hidden' id='user' value={params.name} />
					<input type='hidden' id='reason' value={params.name} />
					<input type='hidden' id='details' value={params.name} />
					<input type='hidden' id='evictedOn' value={params.name} />
					<Container direction='row' maxWidth='md'>
						<Button
							type='submit'
							variant='contained'
						>Submit
						</Button>
						<Button
							type='reset'
							variant='contained'
							color='warning'
						>Reset
						</Button>
					</Container>
				</Form>
			</Stack>
		</Container >
	);
}

