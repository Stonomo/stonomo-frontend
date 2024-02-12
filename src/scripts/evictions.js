const STONOMO_URL = 'http://localhost:7867'
const STONOMO_API_URL = STONOMO_URL + '/v1/'
const searchUrl = STONOMO_API_URL + 'search/'
const evictionsUrl = STONOMO_API_URL + 'evictions/'
const byUserUrl = evictionsUrl + 'by-user/'
const confirmUrl = evictionsUrl + 'confirm/'


export async function searchEvictions(apiClient, q) {
	const response = await apiClient.post(searchUrl,
		// {
		// method: 'POST',
		// headers: {
		// 'Content-Type': 'application/json',
		// 'Authorization': 'Bearer ' + token,
		// },
		JSON.stringify({ q: q })
		// }
	)
	if (!response.ok) {
		throw new Error('HTTP status ' + response.status)
	}
	return response.json()
}

export async function createEviction(
	apiClient,
	tenantName,
	tenantPhone,
	tenantEmail,
	evictedOn,
	reason,
	details
) {
	// TODO: add check for required fields
	const response = await apiClient.post(evictionsUrl,
		// {
		// method: 'POST',
		// headers: {
		// 'Content-Type': 'application/json',
		// 'Authorization': 'Bearer ' + token,
		// },
		JSON.stringify({
			tenantName: tenantName,
			tenantPhone: tenantPhone,
			tenantEmail: tenantEmail,
			evictedOn: evictedOn,
			reason: reason,
			details: details
		})
		// }
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
	details
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
				details: details
			})
		}
	);
	if (!response.ok) {
		throw new Error('Failed to create confirm eviction. Status: ' + response.status);
	}
	return response.text();

}

export async function getEvictionsByUser(apiClient) {
	const response = await apiClient.get(byUserUrl);
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
	return response.text();
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
	return response.json();
}

export async function modifyEviction(apiClient, id, details) {
	// TODO: add check for required fields
	const response = await apiClient.patch(
		evictionsUrl + id,
		{ details: details }
	);
	if (!response.ok) {
		throw new Error('Failed to modify eviction. Status: ' + response.status);
	}
	return response.json();
}

export async function deleteEviction(apiClient, id) {
	const response = await apiClient.delete(evictionsUrl + id);
	if (!response.ok) {
		throw new Error('Failed to delete eviction. Status: ' + response.status);
	}
	return response.json();
}