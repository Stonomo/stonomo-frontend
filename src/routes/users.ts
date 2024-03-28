const usersUrl = import.meta.env.VITE_STONOMO_API_URL + 'users/'

export async function getProfile() {
	const response = await fetch(
		usersUrl,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		})
	if (!response.ok) {
		throw new Error('HTTP status ' + response.status)
	}
	return response.json()
}

export async function getUser(userId: string) {
	const response = await fetch(
		usersUrl + userId,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		})
	if (!response.ok) {
		throw new Error('HTTP status ' + response.status)
	}
	return response.json()
}