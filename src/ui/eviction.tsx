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
	DialogActions,
	Theme
} from '@mui/material';
import {
	DeleteForever,
	KeyboardArrowRight
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { deleteEviction } from '../routes/evictions';
import { evictionPageFields } from '../lib/types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import {
	Content,
	Label,
	dayjsDateFormat
} from '../lib/styled';

export const Item = styled(Paper)(({ theme }: { theme: Theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
}));

export function Eviction() {
	const navigate = useNavigate()
	const fetcher = useFetcher()
	const [searchParams] = useSearchParams()
	const [appendDetails, setAppendDetails] = useState<string>('')
	const [confirmDelete, setConfirmDelete] = useState<string>('')
	const { currentUserId } = useAuth()
	const eviction: evictionPageFields = useLoaderData() as evictionPageFields
	const allowEdit = searchParams.get('m') === 'edit' && currentUserId() === eviction.user._id
	dayjs.extend(utc)

	useEffect(() => {
		if (fetcher.state === "idle" && !fetcher.data) {
			setAppendDetails('')
			fetcher.load(`/dashboard/eviction/${eviction._id}`);
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
			key={eviction._id}
		>
			<Item sx={{ bgcolor: 'white', borderRadius: 2 }}>
				<Stack>
					<Typography variant='h5' fontWeight='bold'>Eviction Report</Typography>
					<Label>Facility:</Label>
					<Button onClick={() => navigate(`/dashboard/user/${eviction.user?._id}`)} sx={{ textAlign: 'left' }}>
						<Typography sx={{ width: '100%' }}>{eviction.user?.facilityName}<br />{`${eviction.user.facilityAddress.city}, ${eviction.user.facilityAddress.state}`}</Typography>
						<KeyboardArrowRight />
					</Button>
					<Label>Evicted On:</Label>
					<Content>{dayjs(eviction.evictedOn).utc().format(dayjsDateFormat)}</Content>
					<Label>Tenant Name:</Label>
					<Content>{eviction.tenantName}</Content>
					<Label>Tenant Phone:</Label>
					<Content>{eviction.tenantPhone}</Content>
					<Label>Tenant Email:</Label>
					<Content>{eviction.tenantEmail}</Content>
					<Label>Reason:</Label>
					<Content>{eviction.reason}</Content>
					<Label>Details:</Label>
					{eviction.details.map((d) => (
						<>
							<Typography sx={{ paddingLeft: '5px', fontStyle: 'italic' }}>{dayjs(d.createdAt).format(dayjsDateFormat)}:</Typography>
							<Content>{d.content}</Content>
						</>
					))}
					{allowEdit && <Box>
						<Box textAlign='center'>
							<fetcher.Form method='PATCH' id='detailsForm'>
								<TextField
									name='details'
									id='details'
									label='Additional Details'
									fullWidth
									value={appendDetails}
									onChange={handleChange}
								/>
								<input type='hidden' name='id' id='id' value={eviction._id} />
								<Button type='submit'
									variant='outlined'>
									Append
								</Button>
								<Button type='reset'
									onClick={() => setAppendDetails('')}
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
					</Box>}
				</Stack >
			</Item>
			{confirmDelete !== '' && <ConfirmDeleteDialog id={confirmDelete} />}
		</Container>
	);
}