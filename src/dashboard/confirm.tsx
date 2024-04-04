import { Button, Container, Stack, TextField, Typography, styled } from "@mui/material";
import { Form, useLoaderData } from "react-router-dom";
import { evictionPageFields } from "../lib/types";

export function ConfirmPage() {
	const report = useLoaderData() as evictionPageFields

	const ConfirmInput = styled(TextField)(() => ({
		marginTop: 12
	}))

	return (
		<Container
			sx={{
				bgcolor: 'primary.main',
				paddingBottom: 2,
				borderBottomLeftRadius: 5,
				borderBottomRightRadius: 5
			}}
		>
			<Container sx={{ bgcolor: 'white', borderRadius: 2 }}>
				<Typography variant='h3'>
					Confirm Report
				</Typography>
				<Stack>
					<ConfirmInput
						id='tenantName'
						name='tenantName'
						label='Tenant Name'
						value={report.tenantName}
						disabled
					/>

					<ConfirmInput
						id='tenantPhone'
						name='tenantPhone'
						label='Tenant Phone'
						value={report.tenantPhone}
						disabled
					/>

					<ConfirmInput
						id='tenantEmail'
						name='tenantEmail'
						label='Tenant Email'
						value={report.tenantEmail}
						disabled
					/>
					<ConfirmInput
						id='user'
						name='user'
						label='User ID'
						value={report.user.facilityName}
						disabled
					/>
					<ConfirmInput
						id='reason'
						name='reason'
						label='Reason'
						value={report.reason.desc}
						disabled
					/>
					<ConfirmInput
						id='evictedOn'
						name='evictedOn'
						label='Evicted On'
						value={report.evictedOn}
						disabled
					/>
					{report.details.map((d) => (
						<ConfirmInput
							key={d._id}
							id='details'
							name={'details-' + d._id}
							label={'Details - ' + d.createdAt}
							value={d.content}
							disabled
						/>

					))}
					<Container maxWidth='md'>
						<Form method='POST'>
							<input type='hidden' name='confirmId' id='confirmId' value={report._id} />
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
						</Form>
					</Container>
				</Stack>
			</Container>
		</Container>
	);
}

