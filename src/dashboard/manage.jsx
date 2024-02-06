import { useLoaderData, useRevalidator } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { Eviction } from "../routes/eviction"
import { deleteEviction, getEvictionsByUser, modifyEviction } from "../scripts/evictions"
import {
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Paper,
	Stack,
	styled
} from "@mui/material"
import { useState } from "react"
import { useFetcher } from "react-router-dom"

const STONOMO_URL = 'http://localhost:7867'
const STONOMO_API_URL = STONOMO_URL + '/v1/'
const evictionsUrl = STONOMO_API_URL + 'evictions/'
const byUserUrl = evictionsUrl + 'by-user'

export async function loader({ request, params }) {
	return await getEvictionsByUser(params.token)
}

export function ManagePage() {
	const evictions = useLoaderData()
	const revalidator = useRevalidator()
	const [confirmDelete, setConfirmDelete] = useState('')

	function ConfirmDeleteDialog() {
		async function handleClose(del = false) {
			setConfirmDelete('')
			if (del) {
				const res = await deleteEviction(confirmDelete, token)
				return revalidator.revalidate()
			}
		}

		return (
			<Dialog
				open={confirmDelete !== ''}
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

	return (
		<Container sx={{ bgcolor: 'primary.main' }}>
			<Stack>
				{evictions.length ? evictions.map((e) => (
					<Container key={e._id} sx={{ my: 1 }}>
						<Eviction params={e} allowEdit={true} setConfirmDelete={setConfirmDelete} />
					</Container>
				)) : <Typography color='white'>No reported evictions found</Typography>}
			</Stack>
			{confirmDelete !== '' && <ConfirmDeleteDialog id={confirmDelete} />}
		</Container>
	);
}