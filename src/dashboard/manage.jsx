import { useRef, useState } from "react"
import { useLoaderData } from "react-router"
import { deleteEviction } from "../routes/evictions.js"
import {
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
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

export function ManagePage({ params }) {
	const evictions = useLoaderData()
	const scrollRef = useRef()

	return (
		<Container
			sx={{ bgcolor: 'primary.main' }}
		>
			<Stack>
				{evictions.length ? evictions.map((e) => (
					<Box
						key={e._id}
						sx={{ my: 1 }}
					>
						<EvictionCard
							params={e}
							managePage={true}
						/>
					</Box>
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