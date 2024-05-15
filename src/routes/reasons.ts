const stonomo_api_url = import.meta.env.VITE_STONOMO_API_URL || process.env.STONOMO_API_URL
const reasonsUrl = stonomo_api_url + 'reasons/'

export async function getReasons() {
	const response = await fetch(
		reasonsUrl,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				accessToken: localStorage.getItem('accessToken')
			})
		}
	);
	if (!response.ok) {
		throw new Error('Failed to fetch reasons list. Status: ' + response.status);
	}
	return response.json();
}