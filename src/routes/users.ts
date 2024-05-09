const stonomo_api_url = import.meta.env.VITE_STONOMO_API_URL || process.env.STONOMO_API_URL
const usersUrl = stonomo_api_url + 'users/'
const settingsUrl = usersUrl + 'settings/'

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

export async function modifyUser(phone: string, email: string, addrSt1: string, addrSt2: string, addrSt3: string, addrCity: string, addrState: string, addrZip: string) {
	const response = await fetch(
		usersUrl,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				facilityPhone: phone,
				facilityEmail: email,
				facilityAddrSt1: addrSt1,
				facilityAddrSt2: addrSt2,
				facilityAddrSt3: addrSt3,
				facilityAddrCity: addrCity,
				facilityAddrState: addrState,
				facilityAddrZip: addrZip,
			})
		}
	)
	if (!response.ok) {
		throw new Error('Failed to modify user. Status: ' + response.status)
	}
	return response.text()
}

export async function getSettings() {
	const response = await fetch(
		settingsUrl,
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