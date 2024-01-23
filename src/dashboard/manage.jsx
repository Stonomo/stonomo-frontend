import { useLoaderData } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { Eviction } from "../routes/eviction"
import { getEvictionsByUser } from "../scripts/evictions"

export async function loader({ request }) {
	const url = new URL(request.url)
	const token = url.searchParams.get('token')
	return await getEvictionsByUser(token)
}

export function ManagePage() {
	const evictions = useLoaderData()
	const { user } = useAuth()

	return (
		<div>
			<h1>This is the Manage page</h1>
			<p>current user: {user}</p>
			<ul className='Manage'>
				{evictions.map((e) => (
					<li key={e._id}>
						<Eviction params={e} />
					</li>
				))}
			</ul>
		</div>
	);
}