const STONOMO_URL = 'http://localhost:7867'
const STONOMO_API_URL = STONOMO_URL + '/v1/'
const evictionsUrl = STONOMO_API_URL + 'evictions/'
const searchUrl = STONOMO_API_URL + 'search/'


export async function searchEvictions(q, token) {
	const response = await fetch(
		searchUrl,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			},
			body: JSON.stringify({ q: q })
		})
	if (!response.ok) {
		throw new Error('HTTP status ' + response.status)
	}
	return response.json()
}

export async function createEviction(params, token) {
	// TODO: add check for required fields
	const response = await fetch(
		evictionsUrl,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			},
			body: JSON.stringify(params)
		}
	);
	if (!response.ok) {
		throw new Error('Failed to create eviction. Status: ' + response.status);
	}
	return response.json();
}

export async function getEvictionsByUser(token) {
	const response = await fetch(
		evictionsUrl + 'by-user',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			}
		}
	);
	if (!response.ok) {
		throw new Error('Failed to fetch eviction list. Status: ' + response.status);
	}
	return response.json();
}

export async function getEviction(id, token) {
	const response = await fetch(
		evictionsUrl + id
	);
	if (!response.ok) {
		throw new Error('Failed to fetch eviction. Status: ' + response.status);
	}
	return response.json();
}

export async function modifyEviction(id, params, token) {
	// TODO: add check for required fields
	const response = await fetch(
		evictionsUrl,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			},
			body: JSON.stringify(params)
		}
	);
	if (!response.ok) {
		throw new Error('Failed to create eviction. Status: ' + response.status);
	}
	return response.json();
}