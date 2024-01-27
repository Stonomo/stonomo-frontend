import { Unstable_Grid2 as Grid, styled, Paper, Typography, Stack, Button, TextField, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { DeleteForever, EditNote } from '@mui/icons-material';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { deleteEviction, modifyEviction } from '../scripts/evictions';
import { Form } from 'react-router-dom';

export async function action({ request }) {
	const formData = await request.formData()
	const id = formData.get('id')
	const token = formData.get('token')
	const details = formData.get('details')
	return await modifyEviction(id, details, token)
}

export function ConfirmDeleteDialog({ id }) {
	const { token } = useAuth()
	const [isOpen, setIsOpen] = useState(true)

	async function handleClose(del = false) {
		setIsOpen(false)
		if (del) {
			return await deleteEviction(id, token)
		}
	}

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			aria-labelledby='delete-dialog-title'
			aria-describedby='delete-dialog-desc'
		>
			<DialogTitle
				id='delete-dialog-title'
			>
				{'Delete Eviction Record?'}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id='delete-dialog-desc'>
					Are you sure you want to delete this record? (CANNOT BE UNDONE!)
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant='outlined' onClick={() => handleClose(true)}>Yes</Button>
				<Button variant='contained' onClick={() => handleClose(false)}>No</Button>
			</DialogActions>
		</Dialog>
	)
}

export function Eviction({ params, allowEdit = false }) {
	const { userId, token } = useAuth()
	const [confirmDelete, setConfirmDelete] = useState(false)
	const [showDetails, setShowDetails] = useState(false)

	function handleDeleteClick(e) {
		e.preventDefault()
		setConfirmDelete(true)
	}

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		marginTop: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));

	const detailsButtonText = (!showDetails ? 'Show' : 'Hide') + ' Details'
	const showEditButtons = (allowEdit && params.user._id === userId)

	return (
		<>
			<Stack direction='row' spacing={2}>
				<Grid container>
					<Grid xs={4}><Typography>{params.tenantName}</Typography></Grid>
					<Grid xs={4}><Typography>{params.tenantPhone}</Typography></Grid>
					<Grid xs={4}><Typography>{params.evictedOn}</Typography></Grid>
					<Grid xs={4}><Typography>{params.user.facilityName}</Typography></Grid>
					<Grid xs={4}><Typography>{params.reason.desc}</Typography></Grid>
					<Grid xs={4}>
						<Button
							onClick={() => { setShowDetails(!showDetails); }}
						>
							{detailsButtonText}
						</Button>
						{showEditButtons && (
							<DeleteForever
								onClick={handleDeleteClick}
							/>
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
			{confirmDelete && <ConfirmDeleteDialog id={params._id} />
			}
		</>
	);
}