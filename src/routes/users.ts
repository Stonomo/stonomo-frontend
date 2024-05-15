const stonomo_api_url = import.meta.env.VITE_STONOMO_API_URL || process.env.STONOMO_API_URL
const usersUrl = stonomo_api_url + 'users/'
const settingsUrl = usersUrl + 'settings/'

export async function getProfile() {
	const response = await fetch(
		usersUrl,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				accessToken: localStorage.getItem('accessToken')
			})
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
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				accessToken: localStorage.getItem('accessToken')
			})
		})
	if (!response.ok) {
		throw new Error('HTTP status ' + response.status)
	}
	return response.json()
}

export async function modifyProfile(facilityName: string, phone: string, email: string, addrSt1: string, addrSt2: string, addrCity: string, addrState: string, addrZip: string) {
	const response = await fetch(
		usersUrl,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				facilityName: facilityName,
				facilityPhone: phone,
				facilityEmail: email,
				facilityAddrSt1: addrSt1,
				facilityAddrSt2: addrSt2,
				facilityAddrCity: addrCity,
				facilityAddrState: addrState,
				facilityAddrZip: addrZip,
				facilityAddrChange: (addrSt1 || addrSt2 || addrCity || addrState || addrZip),
				accessToken: localStorage.getItem('accessToken')
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
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				accessToken: localStorage.getItem('accessToken')
			})
		})
	if (!response.ok) {
		throw new Error('HTTP status ' + response.status)
	}
	return response.json()
}