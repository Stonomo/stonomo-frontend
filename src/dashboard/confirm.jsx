import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Form, useLoaderData } from "react-router-dom";

export function ConfirmPage() {
	const report = useLoaderData()

	const ConfirmInput = styled(TextField)(({ theme }) => ({
		marginTop: 12,
		disabled
	}))

	return (
		<Container sx={{ bgcolor: 'primary.main' }}>
			<Container sx={{ bgcolor: 'white', borderRadius: 2 }}>
				<Typography variant='h3'>
					Confirm Report
				</Typography>
				<Form method='POST'>
					<Stack>
						<ConfirmInput
							id='tenantName'
							name='tenantName'
							label='Tenant Name'
							value={report.tenantName}
						/>

						<ConfirmInput
							id='tenantPhone'
							name='tenantPhone'
							label='Tenant Phone'
							value={report.tenantPhone}
						/>

						<ConfirmInput
							id='tenantEmail'
							name='tenantEmail'
							label='Tenant Email'
							value={report.tenantEmail}
						/>
						<ConfirmInput
							id='user'
							name='user'
							label='User ID'
							value={report.user.facilityName}
						/>
						<ConfirmInput
							id='reason'
							name='reason'
							label='Reason'
							value={report.reason.desc}
						/>
						<ConfirmInput
							id='evictedOn'
							name='evictedOn'
							label='Evicted On'
							value={report.evictedOn}
						/>
						{report.details.map((d) => (
							<ConfirmInput
								key={d._id}
								id='details'
								name={'details-' + d._id}
								label={'Details - ' + d.createdAt}
								value={d.content}
							/>

						))}
						<Container maxWidth='md'>
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
					</Stack>
				</Form>
			</Container>
		</Container>
	);
}

