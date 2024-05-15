const STONOMO_API_URL = import.meta.env.VITE_STONOMO_API_URL || process.env.STONOMO_API_URL
const searchUrl = STONOMO_API_URL + 'search/'
const searchByUserUrl = searchUrl + 'by-user/'
const evictionsUrl = STONOMO_API_URL + 'evictions/'
const evictionsByUserUrl = evictionsUrl + 'by-user/'
const confirmUrl = evictionsUrl + 'confirm/'

export async function searchEvictions(searchName: string, searchPhone: string | null, searchEmail: string | null) {
	const response = await fetch(
		searchUrl,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				searchName: searchName,
				searchPhone: searchPhone,
				searchEmail: searchEmail,
				accessToken: localStorage.getItem('accessToken')
			})
		})
	if (!response.ok) {
		throw new Error('HTTP status ' + response.status)
	}
	return response.json()
}

export async function searchManageEvictions(searchName: string, searchPhone: string | null, searchEmail: string | null) {
	const response = await fetch(
		searchByUserUrl,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				searchName: searchName,
				searchPhone: searchPhone,
				searchEmail: searchEmail,
				accessToken: localStorage.getItem('accessToken')
			})
		})
	if (!response.ok) {
		throw new Error('HTTP status ' + response.status)
	}
	return response.json()
}

export async function createEviction(
	confirmId: string
) {
	const response = await fetch(
		evictionsUrl,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: confirmId,
				accessToken: localStorage.getItem('accessToken')
			})
		}
	);
	if (!response.ok) {
		throw new Error('Failed to create eviction. Status: ' + response.status);
	}
	return response.text();
}

export async function createConfirmEviction(
	tenantName: FormDataEntryValue | null,
	tenantPhone: FormDataEntryValue | null,
	tenantEmail: FormDataEntryValue | null,
	evictedOn: FormDataEntryValue | null,
	reason: FormDataEntryValue | null,
	details: FormDataEntryValue | null
) {
	const response = await fetch(
		confirmUrl,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				tenantName: tenantName,
				tenantPhone: tenantPhone,
				tenantEmail: tenantEmail,
				evictedOn: evictedOn,
				reason: reason,
				details: details,
				accessToken: localStorage.getItem('accessToken')
			})
		}
	);
	if (!response.ok) {
		throw new Error('Failed to create confirm eviction. Status: ' + response.status);
	}
	return response.text();

}

export async function getEviction(id: string) {
	const response = await fetch(
		evictionsUrl + id,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				accessToken: localStorage.getItem('accessToken')
			})
		}
	);
	if (!response.ok) {
		throw new Error('Failed to fetch eviction. Status: ' + response.status);
	}
	return response.json();
}

export async function getConfirmEviction(id: string) {
	const response = await fetch(
		confirmUrl + id,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				accessToken: localStorage.getItem('accessToken')
			})
		}
	);
	if (!response.ok) {
		throw new Error('Failed to fetch confirm eviction. Status: ' + response.status);
	}
	return response.json();
}

export async function modifyEviction(id: string, details: string) {
	const response = await fetch(
		evictionsUrl + id,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				details: details,
				accessToken: localStorage.getItem('accessToken')
			})
		}
	);
	if (!response.ok) {
		throw new Error('Failed to modify eviction. Status: ' + response.status);
	}
	return response.text();
}

export async function deleteEviction(id: string) {
	const response = await fetch(
		evictionsUrl + id,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				accessToken: localStorage.getItem('accessToken')
			})
		}
	);
	if (!response.ok) {
		throw new Error('Failed to delete eviction. Status: ' + response.status);
	}
	return response.text();
}