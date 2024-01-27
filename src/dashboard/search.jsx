import { useState } from "react";
import { Form, Outlet, redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button, Typography, Container, TextField } from "@mui/material";

export async function action({ request }) {
	const formData = await request.formData();
	const q = formData.get('q')
	const token = formData.get('token')
	return redirect(`results/${q}/${token}`)
}

export function SearchPage() {
	const { token } = useAuth()
	const [searchValue, setSearchValue] = useState('')


	function handleChange(e) {
		setSearchValue(e.target.value);
	}

	return (
		<>
			<Typography variant='h3'>Search Eviction Database</Typography>
			<Form method="POST">
				<Container className="search">
					<input type="hidden"
						id="token"
						name="token"
						value={token} />
					<TextField
						required
						id="q"
						name="q"
						onChange={handleChange}
						value={searchValue}
					/>
					<Button variant="contained" type="submit" >Search</Button>
				</Container>
			</Form >
			<Outlet />
		</>
	);
}

