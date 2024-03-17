import {
	Unstable_Grid2 as Grid,
	styled,
	Paper,
	Typography
} from '@mui/material';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export function EvictionCard({ params, managePage = false }) {
	const eviction = params

	const blurredText = { color: 'transparent', textShadow: '0 0 10px rgba(0,0,0,0.75)', userSelect: 'none' };

	return (
		<Item>
			<Grid container xs={12}>
				<Grid xs={4}><Typography>{eviction.tenantName}</Typography></Grid>
				<Grid xs={4}><Typography sx={blurredText}>XXX-XX-XXXX</Typography></Grid>
				<Grid xs={4}><Typography sx={blurredText}>placeholder@facility.com</Typography></Grid>
			</Grid>
			<Grid container xs={12}>
				<Grid xs={4}>
					<Link to={`/dashboard/user/${eviction.user?._id}`}>
						<Typography>{eviction.user.facilityName}</Typography>
					</Link>
					<Typography>{`${eviction.user.facilityAddress.city}, ${eviction.user.facilityAddress.state}`}</Typography>
				</Grid>
				<Grid xs={4}><Typography>{eviction.reason.desc}</Typography></Grid>
				<Grid xs={4}>
					<Link to={`/dashboard/eviction/${eviction._id}?m=${managePage ? 'edit' : ''}`}>
						Show Details
					</Link>
				</Grid>
			</Grid >
		</Item>
	);
}