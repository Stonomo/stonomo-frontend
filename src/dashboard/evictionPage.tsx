import {
	ChangeEvent,
	FormEvent,
	Key,
	useEffect,
	useState
} from 'react';
import {
	Form,
	Link,
	useFetcher,
	useLoaderData,
	useNavigate,
	useSearchParams
} from 'react-router-dom';
import {
	Unstable_Grid2 as Grid,
	styled,
	Paper,
	Typography,
	Stack,
	Button,
	TextField,
	Box,
	Container,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions
} from '@mui/material';
import { DeleteForever } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { deleteEviction } from '../routes/evictions';
import { evictionPageFields } from '../lib/types';
import dayjs from 'dayjs';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export function EvictionPage() {
	const navigate = useNavigate()
	const fetcher = useFetcher()
	const [searchParams] = useSearchParams()
	const [appendDetails, setAppendDetails] = useState<string>('')
	const [confirmDelete, setConfirmDelete] = useState<string>('')
	const { currentUserId } = useAuth()
	const eviction: evictionPageFields = useLoaderData() as evictionPageFields
	const allowEdit = searchParams.get('m') === 'edit' && currentUserId() === eviction.user._id

	useEffect(() => {
		if (fetcher.state === "idle" && !fetcher.data) {
			fetcher.load(`/dashboard/eviction/${eviction._id}`);
			setAppendDetails('')
		}
	}, [fetcher, eviction._id]);

	function ConfirmDeleteDialog(params: { id: string }) {
		async function handleClose(del: boolean) {
			setConfirmDelete('')
			if (del) {
				await deleteEviction(params.id)
				return navigate('/dashboard/manage')
			}
		}

		return (
			<Dialog
				open={confirmDelete !== ''}
				onClose={() => handleClose(false)}
				aria-labelledby='delete-dialog-title'
				aria-describedby='delete-dialog-desc'
			>
				<DialogTitle
					id='delete-dialog-title'
				>
					Delete Eviction Record?
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

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setAppendDetails(e.target.value);
	}

	function handleDeleteClick(e: FormEvent) {
		e.preventDefault()
		setConfirmDelete(eviction._id)
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
			<Item sx={{ bgcolor: 'white', borderRadius: 2 }}>
				<Grid container xs={12}>
					<Grid xs={4}>
						<Typography>{eviction.tenantName}</Typography>
					</Grid>
					<Grid xs={4}>
						<Typography>{eviction.tenantPhone}</Typography>
					</Grid>
					<Grid xs={4}>
						<Typography>{eviction.tenantEmail}</Typography>
					</Grid>
				</Grid>
				<Grid container xs={12}>
					<Grid xs={4}>
						<Link to={`/dashboard/user/${eviction.user?._id}`}>
							<Typography>{eviction.user?.facilityName}</Typography>
						</Link>
						<Typography>{`${eviction.user.facilityAddress.city}, ${eviction.user.facilityAddress.state}`}</Typography>
					</Grid>
					<Grid xs={4}>
						<Typography>{eviction.reason?.desc}</Typography>
					</Grid>
					<Grid xs={4}>
						<Typography>{dayjs(eviction.evictedOn).format('MMM-DD-YYYY')}</Typography>
					</Grid>
					<Grid container xs={12}>
						<Stack>
							{eviction.details?.map((d: { _id: Key; content: string; createdAt: string }) => (
								<Item
									key={d._id}
									sx={{ marginBottom: 1 }}
								>
									<Typography
										variant='body1'
										style={{ whiteSpace: 'pre-wrap' }}
									>
										{dayjs(d.createdAt).format('MMM-DD-YYYY')}: {d.content}
									</Typography>
								</Item>))}
						</Stack>
					</Grid>
					{allowEdit && <Grid xs={12}>
						<TextField
							name='details'
							id='details'
							label='Additional Details'
							fullWidth
							value={appendDetails}
							onChange={handleChange}
						/>
						<Box>
							<fetcher.Form method='PATCH' id='detailsForm'>
								<input type='hidden' name='id' id='id' value={eviction._id} />
								<Button type='submit'
									variant='outlined'>
									Append
								</Button>
								<Button type='reset'
									variant='contained'>
									Cancel
								</Button>
							</fetcher.Form>
							<Form method='DELETE' onSubmit={(e) => handleDeleteClick(e)}>
								<Button type='submit'>
									<DeleteForever />
								</Button>
							</Form>
						</Box>
					</Grid>}
				</Grid >
			</Item>
			{confirmDelete !== '' && <ConfirmDeleteDialog id={confirmDelete} />}
		</Container>
	);
}