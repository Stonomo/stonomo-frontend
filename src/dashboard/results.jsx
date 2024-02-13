import { useLoaderData } from 'react-router'
import { Eviction } from '../routes/eviction'
import { searchEvictions } from '../scripts/evictions'
import {
	Container,
	Stack
} from '@mui/material'

export async function loader({ params }) {
	return await searchEvictions(params.q)
}

export function ResultsPage({ params }) {
	const results = useLoaderData()

	return (
		<Container sx={{ bgcolor: 'primary.main', my: 2 }}>
			<Stack>
				{(results && results.length) ? results.map((result) => (
					<Container key={result._id} sx={{ my: 1 }} >
						<Eviction params={result} />
					</Container>
				)) : 'No results found'}
			</Stack>
		</Container >
	)
}