import { useLoaderData } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { Eviction } from "../routes/eviction"
import { getEvictionsByUser, modifyEviction } from "../scripts/evictions"
import { Container, Paper, Stack, styled } from "@mui/material"

export async function loader({ request, params }) {
	return await getEvictionsByUser(params.token)
}

export function ManagePage() {
	const evictions = useLoaderData()
	const { user, token } = useAuth()

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));

	return (
		<Container>
			<Stack>
				{evictions.map((e) => (
					<Item key={e._id}>
						<Eviction params={e} allowEdit={true} />
					</Item>
				))}
			</Stack>
		</Container>
	);
}