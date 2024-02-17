const STONOMO_API_URL = import.meta.env.VITE_STONOMO_API_URL
const searchUrl = STONOMO_API_URL + 'search/'
const evictionsUrl = STONOMO_API_URL + 'evictions/'
const byUserUrl = evictionsUrl + 'by-user/'
const confirmUrl = evictionsUrl + 'confirm/'


export async function searchEvictions(q) {
	const response = await fetch(
		searchUrl,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ q: q })
		})
	if (!response.ok) {
		throw new Error('HTTP status ' + response.status)
	}
	return response.json()
}

export async function createEviction(
	tenantName,
	tenantPhone,
	tenantEmail,
	evictedOn,
	reason,
	details
) {
	// TODO: add check for required fields
	const response = await fetch(
		evictionsUrl,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				tenantName: tenantName,
				tenantPhone: tenantPhone,
				tenantEmail: tenantEmail,
				evictedOn: evictedOn,
				reason: reason,
				details: details
			})
		}
	);
	if (!response.ok) {
		throw new Error('Failed to create eviction. Status: ' + response.status);
	}
	return response.text();
}

export async function createConfirmEviction(
	tenantName,
	tenantPhone,
	tenantEmail,
	evictedOn,
	reason,
	details
) {
	const response = await fetch(
		confirmUrl,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				tenantName: tenantName,
				tenantPhone: tenantPhone,
				tenantEmail: tenantEmail,
				evictedOn: evictedOn,
				reason: reason,
				details: details
			})
		}
	);
	if (!response.ok) {
		throw new Error('Failed to create confirm eviction. Status: ' + response.status);
	}
	return response.text();

}

export async function getEvictionsByUser() {
	const response = await fetch(
		byUserUrl,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		}
	);
	if (!response.ok) {
		throw new Error('Failed to fetch eviction list. Status: ' + response.status);
	}
	return response.json();
}

export async function getEviction(id) {
	const response = await fetch(
		evictionsUrl + id,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		}
	);
	if (!response.ok) {
		throw new Error('Failed to fetch eviction. Status: ' + response.status);
	}
	return response.text();
}

export async function getConfirmEviction(id) {
	const response = await fetch(
		confirmUrl + id,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		}
	);
	if (!response.ok) {
		throw new Error('Failed to fetch confirm eviction. Status: ' + response.status);
	}
	return response.json();
}

export async function modifyEviction(id, details) {
	// TODO: add check for required fields
	const response = await fetch(
		evictionsUrl + id,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ details: details })
		}
	);
	if (!response.ok) {
		throw new Error('Failed to modify eviction. Status: ' + response.status);
	}
	return response.json();
}

export async function deleteEviction(id) {
	const response = await fetch(
		evictionsUrl + id,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		}
	);
	if (!response.ok) {
		throw new Error('Failed to delete eviction. Status: ' + response.status);
	}
	return response.json();
}