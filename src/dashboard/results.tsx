import { useLoaderData } from 'react-router'
import {
	Box,
	Container,
	Typography
} from '@mui/material'
import { evictionCardFields } from '../lib/types';
import { EvictionList } from '../components/EvictionList';

export function ResultsPage({ managePage }: { managePage: boolean }) {
	const results: evictionCardFields[] = useLoaderData() as evictionCardFields[]

	return (
		<Box sx={{ bgcolor: 'primary.main', my: 2 }}>
			<EvictionList ev={results} managePage={managePage} />
		</Box >
	)
}