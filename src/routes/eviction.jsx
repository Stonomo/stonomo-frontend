import {
	Unstable_Grid2 as Grid,
	styled,
	Paper,
	Typography,
	Stack,
	Button,
	TextField,
	Box
} from '@mui/material';
import { DeleteForever } from '@mui/icons-material';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { modifyEviction } from '../scripts/evictions';
import { Form } from 'react-router-dom';

export async function action({ request }) {
	const formData = await request.formData()
	const id = formData.get('id')
	const token = formData.get('token')
	const details = formData.get('details')
	return await modifyEviction(id, details, token)
}

export function Eviction({ params, allowEdit = false, setConfirmDelete }) {
	const { token } = useAuth()
	const [showDetails, setShowDetails] = useState(false)

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));

	const detailsButtonText = (!showDetails ? 'Show' : 'Hide') + ' Details'
	const showEditButtons = (allowEdit)

	function handleDeleteClick(e) {
		e.preventDefault()
		setConfirmDelete(params._id)
	}

	return (
		<Item>
			<Stack direction='row' gap={2}>
				<Grid container>
					<Grid xs={4}><Typography>{params.tenantName}</Typography></Grid>
					<Grid xs={4}><Typography>{params.tenantPhone}</Typography></Grid>
					<Grid xs={4}><Typography>{params.evictedOn}</Typography></Grid>
					<Grid xs={4}><Typography>{params.user?.facilityName}</Typography></Grid>
					<Grid xs={4}><Typography>{params.reason?.desc}</Typography></Grid>
					<Grid xs={4}>
						<Button
							onClick={() => { setShowDetails(!showDetails); }}
						>
							{detailsButtonText}
						</Button>
						{showEditButtons && (
							<Form method='DELETE' onSubmit={handleDeleteClick}>
								<Button type='submit'>
									<DeleteForever
									/>
								</Button>
							</Form>
						)}
					</Grid>
					{showDetails &&
						<Grid xs={12}>
							<Typography
								variant='body1'
								style={{ whiteSpace: 'pre-wrap' }}
							>
								{params.details}
							</Typography>
						</Grid>}
					{showEditButtons && showDetails && <Grid xs={12}>
						<Form method='POST' id='detailsForm' action='eviction'>
							<TextField
								name='details'
								id='details'
								label='Additional Details'
								fullWidth
							/>
							<input type='hidden' name='id' id='id' value={params._id} />
							<input type='hidden' name='token' id='token' value={token} />
							<Box>
								<Button type='submit'
									variant='outlined'>
									Append
								</Button>
								<Button type='reset'
									variant='contained'>
									Cancel
								</Button>
							</Box>
						</Form>
					</Grid>}
				</Grid >
			</Stack >
		</Item>
	);
}