import { useLoaderData } from 'react-router'
import { EvictionCard } from './evictionCard'
import {
	Container,
	Paper,
	Stack,
	Typography,
	styled
} from '@mui/material'
import { evictionCardFields } from '../lib/types';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));


export function ResultsPage({ managePage }: { managePage: boolean }) {
	const results: evictionCardFields[] = useLoaderData() as evictionCardFields[]

	return (
		<Container sx={{ bgcolor: 'primary.main', my: 2 }}>
			<Typography sx={{ color: 'white' }}>{results.length} records found</Typography>
			<Stack>
				{(results && results.length) ? results.map((result: evictionCardFields) => (
					<Container key={result._id} sx={{ my: 1 }} >
						<EvictionCard eviction={result} managePage={managePage} />
					</Container>
				)) :
					<Container>
						<Item>
							<Typography>No reported evictions found</Typography>
						</Item>
					</Container>
				}
			</Stack>
		</Container >
	)
}