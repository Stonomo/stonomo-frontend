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

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		marginTop: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));

	return (
		<Container>
			<Stack>
				{results.length ? results.map((result) => (
					<Item key={result._id
					} >
						<Eviction params={result} />
					</Item>
				)) : 'No results found'}
			</Stack>
		</Container >
	)
}