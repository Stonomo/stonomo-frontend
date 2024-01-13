import { useLoaderData, useLocation } from "react-router";
import { useState } from 'react'
import { useAuth } from "../hooks/useAuth";

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

	return (
		<div>
			<h1>This is the Results page</h1>
			<p>current user: {user}</p>
			<p>token: {token}</p>
			<p>{results[0]._id}</p>
			<ul>
				{Object.values(results).forEach((result) => {
					<li key={result._id}>
						<Result params={result} />
					</li>
				})}
			</ul>
		</div>
	);
}

export function Result({ params }) {
	return (<p>{params.tenantName}</p>);
}