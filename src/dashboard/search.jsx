import { useState } from "react";
import { Form, Outlet, redirect, useLoaderData } from "react-router-dom";
import { Button, Typography, Container, TextField, Stack } from "@mui/material";

export async function action({ request }) {
	const formData = await request.formData();
	const q = formData.get('q')
	return redirect(`results/${q}`)
}

export async function loader({ params }) {
	const q = params.q
	return q
}

export function SearchPage() {
	const q = useLoaderData()
	const [searchValue, setSearchValue] = useState(q)


	function handleChange(e) {
		setSearchValue(e.target.value);
	}

	return (
		<Container
		// sx={{ bgcolor: 'primary.dark' }}
		>
			<Typography variant='h3' /*color='white'*/>Search Eviction Database</Typography>
			<Form method="POST">
				<Stack alignItems='center' className="search">
					<TextField
						required
						id="q"
						name="q"
						onChange={handleChange}
						value={searchValue}
						fullWidth
					// sx={{ bgcolor: "white", borderRadius: 1, textAlign: 'center' }}
					/>
					<Button variant="contained" type="submit" fullWidth >Search</Button>
				</Stack>
			</Form >
			<Outlet />
		</Container>
	);
}

