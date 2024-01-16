import { useLoaderData, useLocation } from "react-router";
import { useState } from 'react'
import { useAuth } from "../hooks/useAuth";
import { Eviction } from "../routes/eviction";

export async function loader({ request }) {
	const url = new URL(request.url);
	const q = url.searchParams.get('q');
	const token = url.searchParams.get('token');
	// const { token } = useAuth();
	const response = await fetch('http://localhost:7867/v1/search', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token,
		},
		body: JSON.stringify({ q: q })
	});

	if (!response.ok) {
		throw new Error('HTTP status ' + response.status);
	}
	return response.json();
}

export function ResultsPage() {
	const results = useLoaderData();
	const { user, token } = useAuth();
	const [debugRes, setDebugRes] = useState(results);

	return (
		<div>
			<h1>This is the Results page</h1>
			<p>current user: {user}</p>
			<ul className="Results">
				{results.map((result) => (
					<li key={result._id}>
						<Eviction params={result} />
					</li>
				))}
			</ul>
		</div>
	);
}