import { Button, Container, InputLabel, MenuItem, Select, Stack, TextField, Typography, styled } from '@mui/material';
import { Form, useLoaderData } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { maskPhoneInput } from '../scripts/handlers';

const TextInput = styled(TextField)(() => ({
	marginTop: 12
}))

export function ReportPage() {
	const [formData, setFormData] = useLocalStorage('reportForm', {
		tenantName: '',
		tenantPhone: '',
		tenantEmail: '',
		reason: '',
		evictedOn: '',
		details: '',
	})
	// const actionData = useActionData()
	const reasons = useLoaderData()

	function handleChange(e) {
		let field, value
		if (!e.target) {
			field = 'evictedOn'
			value = dayjs(e).format()
		} else {
			field = e.target.name
			value = e.target.value
		}
		setFormData(({ ...formData, [field]: value }))
	}

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
							value={formData.tenantName}
							defaultValue=''
							placeholder='Tenant Name'
						/>
						{/* {actionData?.tenantName &&
							<Typography variant='small'>{actionData?.tenantName}</Typography>} */}
						<TextInput
							id='tenantPhone'
							name='tenantPhone'
							type='tel'
							label='Tenant Phone'
							required
							onChange={handleChange}
							onInput={maskPhoneInput}
							value={formData.tenantPhone}
							defaultValue=''
							placeholder='Tenant Phone'
						/>
						{/* {actionData?.tenantPhone &&
							<Typography variant='small'>{actionData?.tenantPhone}</Typography>} */}
						<TextInput
							id='tenantEmail'
							name='tenantEmail'
							type='email'
							label='Tenant Email'
							onChange={handleChange}
							value={formData.tenantEmail}
							defaultValue=''
							placeholder='Tenant Email'
						/>
						{/* {actionData?.tenantEmail &&
							<Typography variant='small'>{actionData?.tenantEmail}</Typography>} */}
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
						{/* {actionData?.evictedOn &&
							<Typography variant='small'>{actionData?.evictedOn}</Typography>} */}
						<InputLabel id='reason-select-label'>Reason For Eviction</InputLabel>
						<Select
							id='reason'
							name='reason'
							labelId='reason-select-label'
							value={formData.reason}
							defaultValue=''
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
						<TextInput
							id='details'
							name='details'
							label='Details'
							placeholder='Please provide any details. Do not include personal information.'
							multiline
							rows={4}
							onChange={handleChange}
							value={formData.details}
							defaultValue=''
						/>
						{/* {actionData?.details &&
							<Typography variant='small'>{actionData?.details}</Typography>} */}
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
