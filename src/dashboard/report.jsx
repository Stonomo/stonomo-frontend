import { Button, Container, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { Form, useActionData, useLoaderData } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DatePicker } from '@mui/x-date-pickers';
import { getReasons } from '../scripts/reasons';

export async function loader({ params }) {
	return await getReasons(params.token)
}

// export async function action({ request }) {
// 	const formData = await request.formData()
// 	const name = formData.get('tenantName')
// 	const phone = formData.get('tenantPhone')
// 	const email = formData.get('tenantEmail')
// 	return redirect(`/dashboard/confirm/${name}/${phone}/${email}`)
// }

export function ReportPage() {
	const { user } = useAuth()
	const [formData, setFormData] = useLocalStorage('reportForm', {})
	const actionData = useActionData()
	const reasons = useLoaderData()

	function handlePhoneInput(e) {
		const input = String.fromCharCode(e.keyCode)
		if (!/[0-9-]/.test(input)) {
			e.preventDefault()
		}
	}

	function handleChange(e) {
		const field = e.target.id
		const val = e.target.value
		setFormData(d => ({ ...d, [field]: val }))
	}

	return (
		<Container>
			<Typography variant='h3'>
				Report an Eviction
			</Typography>
			<p>
				{formData.reason}
			</p>
			<Form method='POST' action='/dashboard/confirm'>
				<Stack>
					<TextField
						id='tenantName'
						name='tenantName'
						label='Tenant Name'
						margin='dense'
						required
						autoFocus
						onChange={handleChange}
						value={formData.tenantName || ''}
					/>
					{actionData?.tenantName &&
						<Typography variant='small'>{actionData?.tenantName}</Typography>}
					<TextField
						id='tenantPhone'
						name='tenantPhone'
						type='tel'
						label='Tenant Phone'
						margin='dense'
						required
						onChange={handleChange}
						onKeyDown={handlePhoneInput}
						value={formData.tenantPhone || ''}
					/>
					{actionData?.tenantPhone &&
						<Typography variant='small'>{actionData?.tenantPhone}</Typography>}
					<TextField
						id='tenantEmail'
						name='tenantEmail'
						type='email'
						label='Tenant Email'
						margin='dense'
						onChange={handleChange}
						value={formData.tenantEmail || ''}
					/>
					{actionData?.tenantEmail &&
						<Typography variant='small'>{actionData?.tenantEmail}</Typography>}
					<DatePicker
						id='evictedOn'
						label='Evicted On'
						views={['year', 'month', 'day']}
						value={formData.evictedOn || ''}
						onChange={handleChange}
					/>
					{actionData?.evictedOn &&
						<Typography variant='small'>{actionData?.evictedOn}</Typography>}
					<InputLabel id='reason-select-label'>Reason For Eviction</InputLabel>
					<Select
						id='reason'
						label='Reason For Eviction'
						value={formData.reason}
						onChange={handleChange}
						displayEmpty
						required
					>
						<MenuItem disabled value=''><em>Select Reason</em></MenuItem>
						{reasons.map((r) => (
							<MenuItem
								value={r.label}
							>
								{r.desc}
							</MenuItem>
						))}
					</Select>
					<TextField
						id='details'
						name='details'
						label='Details'
						placeholder='Please provide as many details as possible'
						multiline
						required
						rows={4}
						margin='dense'
						onChange={handleChange}
						value={formData.details}
					/>
					{actionData?.details &&
						<Typography variant='small'>{actionData?.details}</Typography>}
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
				</Stack>
			</Form>
		</Container>
	);
}
