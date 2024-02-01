const STONOMO_URL = 'http://localhost:7867'
const STONOMO_API_URL = STONOMO_URL + '/v1/'
const evictionsUrl = STONOMO_API_URL + 'evictions/'
const confirmUrl = evictionsUrl + 'confirm/'
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

export async function createEviction(
	token,
	tenantName,
	tenantPhone,
	tenantEmail,
	evictedOn,
	reason,
	details,
	user
) {
	// TODO: add check for required fields
	const response = await fetch(
		evictionsUrl,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			},
			body: JSON.stringify({
				tenantName: tenantName,
				tenantPhone: tenantPhone,
				tenantEmail: tenantEmail,
				evictedOn: evictedOn,
				reason: reason,
				details: details,
				user: user
			})
		}
	);
	if (!response.ok) {
		throw new Error('Failed to create eviction. Status: ' + response.status);
	}
	return response.text();
}

export async function createConfirmEviction(
	token,
	tenantName,
	tenantPhone,
	tenantEmail,
	evictedOn,
	reason,
	details,
	user
) {
	const response = await fetch(
		confirmUrl,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			},
			body: JSON.stringify({
				tenantName: tenantName,
				tenantPhone: tenantPhone,
				tenantEmail: tenantEmail,
				evictedOn: evictedOn,
				reason: reason,
				details: details,
				user: user
			})
		}
	);
	if (!response.ok) {
		throw new Error('Failed to create confirm eviction. Status: ' + response.status);
	}
	return response.text();

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
		evictionsUrl + id,
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			}
		}
	);
	if (!response.ok) {
		throw new Error('Failed to fetch eviction. Status: ' + response.status);
	}
	return response.json();
}

export async function getConfirmEviction(id, token) {
	const response = await fetch(
		confirmUrl + id,
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			}
		}
	);
	if (!response.ok) {
		throw new Error('Failed to fetch confirm eviction. Status: ' + response.status);
	}
	return response;
}

export async function modifyEviction(id, details, token) {
	// TODO: add check for required fields
	const response = await fetch(
		evictionsUrl + id,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			},
			body: JSON.stringify({ details: details })
		}
	);
	if (!response.ok) {
		throw new Error('Failed to modify eviction. Status: ' + response.status);
	}
	return response.json();
}

export async function deleteEviction(id, token) {
	const response = await fetch(
		evictionsUrl + id,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			},
		}
	);
}