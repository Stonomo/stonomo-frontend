const STONOMO_URL = 'http://localhost:7867'
const STONOMO_API_URL = STONOMO_URL + '/v1/'
const reasonsUrl = STONOMO_API_URL + 'reasons/'

export async function getReasons(token) {
	const response = await fetch(
		reasonsUrl,
		{
			// method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			}
		}
	);
	if (!response.ok) {
		throw new Error('Failed to fetch reasons list. Status: ' + response.status);
	}
	return response.json();
}