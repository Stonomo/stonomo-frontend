const evictionsUrl = 'http://localhost:7867/v1/evictions'


async function createEviction(token) { }

async function getUserEvictions(user, token) {
	// const { user, token } = useAuth();
	const response = await fetch(
		`${evictionsUrl}/by-user/${user}`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch eviction list.');
	}
	return response.json();
}

async function getEviction(id, token) {
	const response = await fetch(
		`${evictionsUrl}/${id}`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch eviction. ');
	}
	return response.json();
}
