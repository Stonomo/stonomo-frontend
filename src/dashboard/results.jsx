import { useLoaderData } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { Eviction } from '../routes/eviction'
import { searchEvictions } from '../scripts/evictions'
import { Container, Paper, Stack, Typography, styled } from '@mui/material'

export async function loader({ params }) {
	return await searchEvictions(params.q, params.token)
}

export function ResultsPage({ params }) {
	const results = useLoaderData()
	const { user, token } = useAuth()

	return (
		<Container>
			<Stack>
				{results.length ? results.map((result) => (
					<div key={result._id
					} >
						<Eviction params={result} />
					</div>
				)) : 'No results found'}
			</Stack>
		</Container >
	)
}