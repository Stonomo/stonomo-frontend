import {
	Button,
	Container,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	TextField,
	Typography,
	styled
} from '@mui/material';
import {
	Form,
	useLoaderData
} from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { maskPhoneInput } from '../lib/handlers';
import { ChangeEvent } from 'react';
import { reasonFields } from '../lib/types';

const TextInput = styled(TextField)(() => ({
	marginTop: 12
}))

export function ReportPage() {
	const [formData, setFormData] = useLocalStorage('reportForm', {
		tenantName: '',
		tenantPhone: '',
		tenantEmail: '',
		reason: '',
		evictedOn: dayjs(''),
		details: '',
	})
	const reasons = useLoaderData() as reasonFields[]

	function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<HTMLInputElement | string> | null) {
		if (e) {
			let field, value
			if (!e.target) {
				field = 'evictedOn'
				value = dayjs(e.toString()).format()
			} else {
				field = e.target.name
				value = e.target.value
			}
			setFormData(({ ...formData, [field]: value }))
		}
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
						<DatePicker
							id='evictedOn'
							name='evictedOn'
							label='Evicted On'
							views={['year', 'month', 'day']}
							value={dayjs(formData.evictedOn)}
							onChange={handleChange}
							required
							sx={{ marginTop: 2 }}
						// disableFuture={true}
						/>
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
							{reasons.map((r: reasonFields) => (
								<MenuItem
									key={r.label}
									value={r.label}
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
						<Container maxWidth='md'
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
