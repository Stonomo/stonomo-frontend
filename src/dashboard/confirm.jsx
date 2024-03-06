import { Button, Container, ListItem, Stack, Typography } from "@mui/material";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { createEviction, getConfirmEviction } from "../scripts/evictions";

export async function loader({ params }) {
	return await getConfirmEviction(
		params.confirmId
	)
}

export async function action({ request }) {
	const formData = await request.formData()
	const token = formData.get('token');
	const docId = await createEviction(
		formData.get('tenantName'),
		formData.get('tenantPhone'),
		formData.get('tenantEmail'),
		formData.get('evictedOn'),
		formData.get('reason'),
		formData.get('details'),
		formData.get('user')
	)
	return redirect(`/dashboard/manage/${docId}`)
}

export function ConfirmPage() {
	const report = useLoaderData()

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
					{report.tenantName}
				</ListItem>
				<ListItem
					id='tenantPhone'
					name='tenantPhone'
					label='Tenant Phone'
					margin='dense'
				>
					{report.tenantPhone}
				</ListItem>
				<ListItem
					id='tenantEmail'
					name='tenantEmail'
					label='Tenant Email'
					margin='dense'
				>
					{report.tenantEmail}
				</ListItem>
				<ListItem
					id='user'
					name='user'
					label='User ID'
					margin='dense'
				>
					{report.user.facilityName}
				</ListItem>
				<ListItem
					id='reason'
					name='reason'
					label='Reason'
					margin='dense'
				>
					{report.reason.desc}
				</ListItem>
				<ListItem
					id='evictedOn'
					name='evictedOn'
					label='Evicted On'
					margin='dense'
				>
					{report.evictedOn}
				</ListItem>
				{report.details.map((d) => (
					<ListItem
						key={d._id}
						id='details'
						name={'details-' + d._id}
						label={'Details - ' + d.createdAt}
						margin='dense'
					>
						{d.content}
					</ListItem>
				))}
				<Form method='POST'>
					<input
						type='hidden'
						id='tenantName'
						name='tenantName'
						value={report.tenantName}
					/>
					<input
						type='hidden'
						id='tenantPhone'
						name='tenantPhone'
						value={report.tenantPhone}
					/>
					<input
						type='hidden'
						id='tenantEmail'
						name='tenantEmail'
						value={report.tenantEmail}
					/>
					<input
						type='hidden'
						id='user'
						name='user'
						value={report.user?._id}
					/>
					<input
						type='hidden'
						id='reason'
						name='reason'
						value={report.reason?._id}
					/>
					{report.details.map((d) => (
						<input
							key={d._id}
							type='hidden'
							id='details'
							name='details'
							value={d.content}
						/>))}
					<input
						type='hidden'
						id='evictedOn'
						name='evictedOn'
						value={report.evictedOn}
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

