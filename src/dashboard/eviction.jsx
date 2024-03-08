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
import { Form } from 'react-router-dom';

export function Eviction({ params, allowEdit = false, setConfirmDelete }) {
	const [showDetails, setShowDetails] = useState(false)

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));

	const detailsButtonText = (!showDetails ? 'Show' : 'Hide') + ' Details'
	const blurredText = { color: 'transparent', textShadow: '0 0 10px rgba(0,0,0,0.75)', userSelect: 'none' };

	function handleDeleteClick(e) {
		e.preventDefault()
		setConfirmDelete(params._id)
	}

	return (
		<Item>
			<Grid container xs={12}>
				<Grid xs={4}><Typography>{params.tenantName}</Typography></Grid>
				<Grid xs={4}><Typography sx={blurredText}>{params.tenantPhone}</Typography></Grid>
				<Grid xs={4}><Typography sx={blurredText}>{params.tenantEmail}</Typography></Grid>
			</Grid>
			<Grid container xs={12}>
				<Grid xs={4}><Typography>{params.user.facilityName}</Typography></Grid>
				<Grid xs={4}><Typography>{params.reason.desc}</Typography></Grid>
				<Grid xs={4}>
					<Button
						onClick={() => { setShowDetails(!showDetails); }}
					>
						{detailsButtonText}
					</Button>
					{(allowEdit) && (
						<Form method='DELETE' onSubmit={handleDeleteClick}>
							<Button type='submit'>
								<DeleteForever
								/>
							</Button>
						</Form>
					)}
				</Grid>
				{showDetails && <Stack container xs={12}>
					{params.details.map((d) => (
						<Item
							xs={12}
							key={d._id}
							sx={{ marginBottom: 1 }}
						>
							<Typography
								variant='body1'
								style={{ whiteSpace: 'pre-wrap' }}
							>
								{d.content}
							</Typography>
						</Item>))}
				</Stack>}
				{allowEdit && showDetails && <Grid xs={12}>
					<Form method='POST' id='detailsForm' action='eviction'>
						<TextField
							name='details'
							id='details'
							label='Additional Details'
							fullWidth
						/>
						<input type='hidden' name='id' id='id' value={params._id} />
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
		</Item>
	);
}