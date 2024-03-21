import { useLoaderData } from "react-router"
import {
	Box,
	Container,
	Paper,
	Stack,
	Typography,
	styled
} from "@mui/material"
import { EvictionCard } from "./evictionCard.jsx"

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export function ManagePage() {
	const evictions = useLoaderData()

	return (
		<Container
			sx={{ bgcolor: 'primary.main' }}
		>
			<Stack>
				{evictions.length ? evictions.map((e) => (
					<Container key={e._id} sx={{ my: 1 }} >
						<EvictionCard
							eviction={e}
							managePage={true}
						/>
					</Container>
				)) :
					<Container>
						<Item>
							<Typography color='white'>No reported evictions found</Typography>
						</Item>
					</Container>
				}
			</Stack >
		</Container >
	);
}