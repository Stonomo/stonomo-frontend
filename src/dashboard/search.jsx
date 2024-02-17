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
	const [searchValue, setSearchValue] = useState(q || '')


	function handleChange(e) {
		setSearchValue(e.target.value);
	}

	return (
		<Container
		// sx={{ bgcolor: 'primary.dark' }}
		>
			<Container
				sx={{ textAlign: "center" }}
			>
				<Typography variant='h3' /*color='white'*/>
					Search Eviction Database
				</Typography>
			</Container>
			<Form method="POST">
				<Stack alignItems='center' className="search">
					<TextField
						required
						id="q"
						name="q"
						onChange={handleChange}
						value={searchValue}
						fullWidth
					/>
					<Button
						variant="contained"
						type="submit"
					>
						<Typography
							variant="h6"
							component="a"
						>
							Search
						</Typography>
					</Button>
				</Stack>
			</Form >
			<Outlet />
		</Container>
	);
}

