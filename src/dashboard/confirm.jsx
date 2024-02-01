import { Button, Container, ListItem, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { Form, useLoaderData, useParams } from "react-router-dom";
import { createEviction, getConfirmEviction } from "../scripts/evictions";
import { useLocalStorage } from "../hooks/useLocalStorage";

export async function loader({ params }) {
	return await getConfirmEviction(params.confirmId, params.token)
}
// 	// console.log(request)
// 	const url = new URL(request.url)
// 	const formData = url.searchParams
// 	const tenantName = formData.get['tenantName']
// 	console.log(formData)
// 	return { tenantName: tenantName }
// 	// <input type='hidden' id='tenantPhone' value={params.phone} />
// 	// <input type='hidden' id='tenantEmail' value={params.email} />
// 	// <input type='hidden' id='user' value={params.user} />
// 	// <input type='hidden' id='reason' value={params.reason} />
// 	// <input type='hidden' id='details' value={params.details} />
// 	// <input type='hidden' id='evictedOn' value={params.evictedOn} />

// }

export async function action({ params }) {
	// return await createEviction(token, params)
	return null
}

export function ConfirmPage() {
	const { user } = useAuth()
	const params = useLoaderData()

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
					{params.get('tenantName')}
				</ListItem>
				<ListItem
					id='tenantPhone'
					name='tenantPhone'
					label='Tenant Phone'
					margin='dense'
				>
					{params.get('tenantPhone')}
				</ListItem>
				<ListItem
					id='tenantEmail'
					name='tenantEmail'
					label='Tenant Email'
					margin='dense'
				>
					{params.get('tenantEmail')}
				</ListItem>
				<ListItem
					id='user'
					name='user'
					label='User ID'
					margin='dense'
				>
					{params.get('user')}
				</ListItem>
				<ListItem
					id='reason'
					name='reason'
					label='Reason'
					margin='dense'
				>
					{params.get('reason')}
				</ListItem>
				<ListItem
					id='evictedOn'
					name='evictedOn'
					label='Evicted On'
					margin='dense'
				>
					{params.get('evictedOn')}
				</ListItem>
				<ListItem
					id='details'
					name='details'
					label='Details'
					margin='dense'
				>
					{params.get('details')}
				</ListItem>
				<Form method='POST'>
					<input
						type='hidden'
						id='tenantName'
						value={params.tenantName}
					/>
					<input
						type='hidden'
						id='tenantPhone'
						value={params.tenantPhone}
					/>
					<input
						type='hidden'
						id='tenantEmail'
						value={params.tenantEmail}
					/>
					<input
						type='hidden'
						id='user'
						value={params.user}
					/>
					<input
						type='hidden'
						id='reason'
						value={params.reason}
					/>
					<input
						type='hidden'
						id='details'
						value={params.details}
					/>
					<input
						type='hidden'
						id='evictedOn'
						value={params.evictedOn}
					/>
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

