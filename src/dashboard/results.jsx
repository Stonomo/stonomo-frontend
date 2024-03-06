import { useLoaderData } from 'react-router'
import { Eviction } from '../routes/eviction'
import { searchEvictions } from '../scripts/evictions'
import {
	Container,
	Stack
} from '@mui/material'

export async function loader({ params }) {
	const { searchName, searchPhone, searchEmail } = params
	return await searchEvictions(
		searchName,
		searchPhone,
		searchEmail
	)
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