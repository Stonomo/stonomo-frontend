import { useLoaderData } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { Eviction } from '../routes/eviction'
import { searchEvictions } from '../scripts/evictions'

export async function loader({ request }) {
	const url = new URL(request.url)
	const q = url.searchParams.get('q')
	const token = url.searchParams.get('token')
	return await searchEvictions(q, token)
}

export function ResultsPage() {
	const results = useLoaderData()
	const { user, token } = useAuth()

	return (
		<div>
			<h1>This is the Results page</h1>
			<p>current user: {user}</p>
			<ul className='Results'>
				{results.map((result) => (
					<li key={result._id}>
						<Eviction params={result} />
					</li>
				))}
			</ul>
		</div>
	)
}