import { Button, Container, ListItem, Stack, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { createEviction, getConfirmEviction } from "../scripts/evictions";

export async function loader({ params }) {
	return await getConfirmEviction(
		params.confirmId,
		params.token
	)
}

export async function action({ request }) {
	const formData = await request.formData()
	const token = formData.get('token');
	const docId = await createEviction(
		token,
		formData.get('tenantName'),
		formData.get('tenantPhone'),
		formData.get('tenantEmail'),
		formData.get('evictedOn'),
		formData.get('reason'),
		formData.get('details'),
		formData.get('user')
	)
	return redirect(`/dashboard/manage/${token}/${docId}`)
}

export function ConfirmPage() {
	const { token } = useAuth()
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
					{params['tenantName']}
				</ListItem>
				<ListItem
					id='tenantPhone'
					name='tenantPhone'
					label='Tenant Phone'
					margin='dense'
				>
					{params.tenantPhone}
				</ListItem>
				<ListItem
					id='tenantEmail'
					name='tenantEmail'
					label='Tenant Email'
					margin='dense'
				>
					{params.tenantEmail}
				</ListItem>
				<ListItem
					id='user'
					name='user'
					label='User ID'
					margin='dense'
				>
					{params.user?.facilityName}
				</ListItem>
				<ListItem
					id='reason'
					name='reason'
					label='Reason'
					margin='dense'
				>
					{params.reason?.desc}
				</ListItem>
				<ListItem
					id='evictedOn'
					name='evictedOn'
					label='Evicted On'
					margin='dense'
				>
					{params.evictedOn}
				</ListItem>
				<ListItem
					id='details'
					name='details'
					label='Details'
					margin='dense'
				>
					{params.details}
				</ListItem>
				<Form method='POST'>
					<input
						type='hidden'
						id='tenantName'
						name='tenantName'
						value={params.tenantName}
					/>
					<input
						type='hidden'
						id='tenantPhone'
						name='tenantPhone'
						value={params.tenantPhone}
					/>
					<input
						type='hidden'
						id='tenantEmail'
						name='tenantEmail'
						value={params.tenantEmail}
					/>
					<input
						type='hidden'
						id='user'
						name='user'
						value={params.user?._id}
					/>
					<input
						type='hidden'
						id='reason'
						name='reason'
						value={params.reason?._id}
					/>
					<input
						type='hidden'
						id='details'
						name='details'
						value={params.details}
					/>
					<input
						type='hidden'
						id='evictedOn'
						name='evictedOn'
						value={params.evictedOn}
					/>
					<input
						type='hidden'
						id='token'
						name='token'
						value={token}
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

