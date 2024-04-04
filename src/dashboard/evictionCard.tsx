import {
	Unstable_Grid2 as Grid,
	styled,
	Paper,
	Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import { evictionCardFields } from '../lib/types';
import { ManagePage } from './manage';
import dayjs from 'dayjs';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export function EvictionCard(params: { eviction: evictionCardFields, managePage: boolean }) {
	const ev = params.eviction
	const onManagePage = params.managePage || false
	const matchCriteria = `Matches: ${ev.nameMatches ? 'Name' : ''} ${ev.phoneMatches ? 'Phone' : ''} ${ev.emailMatches ? 'Email' : ''}`

	return (
		<Item>
			<Grid container xs={12}>
				<Grid xs={4}>
					<Typography>{dayjs(ev.evictedOn).format('MMM-DD-YYYY')}</Typography>
				</Grid>
				<Grid xs={4}><Typography>{matchCriteria}</Typography></Grid>
				<Grid xs={4}>

					<Link to={`/dashboard/eviction/${ev._id}?m=${onManagePage ? 'edit' : ''}`}>
						Show Details
					</Link>
				</Grid>
			</Grid >
		</Item>
	);
}