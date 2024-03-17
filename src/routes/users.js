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

export async function getUser(userid) {
	const response = await fetch(
		usersUrl + userid,
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