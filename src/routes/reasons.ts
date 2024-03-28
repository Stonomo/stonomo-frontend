const reasonsUrl = import.meta.env.VITE_STONOMO_API_URL + 'reasons/'

export async function getReasons() {
	const response = await fetch(
		reasonsUrl,
		{
			headers: {
				'Content-Type': 'application/json',
			}
		}
	);
	if (!response.ok) {
		throw new Error('Failed to fetch reasons list. Status: ' + response.status);
	}
	return response.json();
}