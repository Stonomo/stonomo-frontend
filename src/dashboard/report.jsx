import { Button, Container, InputLabel, MenuItem, Select, Stack, TextField, Typography, styled } from '@mui/material';
import { Form, redirect, useActionData, useLoaderData } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DatePicker } from '@mui/x-date-pickers';
import { getReasons } from '../scripts/reasons';
import dayjs from 'dayjs';
import { createConfirmEviction } from '../scripts/evictions';

export async function loader() {
	return await getReasons()
}

export async function action({ request }) {
	const formData = await request.formData()
	const confirmDocId = await createConfirmEviction(
		formData.get('tenantName'),
		formData.get('tenantPhone'),
		formData.get('tenantEmail'),
		formData.get('evictedOn'),
		formData.get('reason'),
		formData.get('details'),
		formData.get('user')
	)
	console.log(confirmDocId)
	return redirect(`/dashboard/confirm/${confirmDocId}`)
}

export function ReportPage() {
	const [formData, setFormData] = useLocalStorage('reportForm', {})
	const actionData = useActionData()
	const reasons = useLoaderData()

	function handlePhoneInput(e) {
		const m = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
		e.target.value = !m[2] ? m[1] : '(' + m[1] + ')' + m[2] + (m[3] ? '-' + m[3] : '')
	}

	function handleChange(e) {
		let field, value
		if (!e.target) {
			field = 'evictedOn'
			value = dayjs(e).format()
		} else {
			field = e.target.name
			value = e.target.value
		}
		setFormData(d => ({ ...d, [field]: value }))
		// console.log(formData)
	}

	const TextInput = styled(TextField)(({ theme }) => ({
		marginTop: 12
	}))

	return (
		<Container sx={{ bgcolor: 'primary.main', paddingBottom: 2, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
			<Container sx={{ bgcolor: 'white', borderRadius: 2 }}>
				<Typography variant='h3'>
					Report an Eviction
				</Typography>
				<Form
					method='POST'
				>
					<Stack>
						<TextInput
							id='tenantName'
							name='tenantName'
							label='Tenant Name'
							required
							onChange={handleChange}
							value={formData.tenantName || ''}
							placeholder='Tenant Name'
						/>
						{actionData?.tenantName &&
							<Typography variant='small'>{actionData?.tenantName}</Typography>}
						<TextInput
							id='tenantPhone'
							name='tenantPhone'
							type='tel'
							label='Tenant Phone'
							required
							onChange={handleChange}
							onInput={handlePhoneInput}
							value={formData.tenantPhone || ''}
							placeholder='Tenant Phone'
						/>
						{actionData?.tenantPhone &&
							<Typography variant='small'>{actionData?.tenantPhone}</Typography>}
						<TextInput
							id='tenantEmail'
							name='tenantEmail'
							type='email'
							label='Tenant Email'
							onChange={handleChange}
							value={formData.tenantEmail || ''}
							placeholder='Tenant Email'
						/>
						{actionData?.tenantEmail &&
							<Typography variant='small'>{actionData?.tenantEmail}</Typography>}
						<DatePicker
							id='evictedOn'
							name='evictedOn'
							label='Evicted On'
							views={['year', 'month', 'day']}
							value={dayjs(formData.evictedOn)}
							defaultValue={dayjs()}
							onChange={handleChange}
							required
							sx={{ marginTop: 2 }}
						/>
						{actionData?.evictedOn &&
							<Typography variant='small'>{actionData?.evictedOn}</Typography>}
						<InputLabel id='reason-select-label'>Reason For Eviction</InputLabel>
						<Select
							id='reason'
							name='reason'
							labelId='reason-select-label'
							value={formData.reason || ''}
							onChange={handleChange}
							displayEmpty
							required
						>
							<MenuItem disabled value=''><em>Select Reason for Eviction</em></MenuItem>
							{reasons.map((r) => (
								<MenuItem
									key={r._id}
									value={r._id}
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
						<Container direction='row' maxWidth='md'
							sx={{ textAlign: 'center', margin: 1 }}>
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
