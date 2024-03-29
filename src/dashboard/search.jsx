import { useState } from "react";
import { Form, Outlet, useLoaderData } from "react-router-dom";
import { Button, Typography, Container, TextField, Stack } from "@mui/material";

export function SearchPage() {
	const searchParams = useLoaderData()
	const [searchValues, setSearchValues] = useState(searchParams || {})


	function handleChange(e) {
		const field = e.target.name
		const value = e.target.value
		setSearchValues(val => ({ ...val, [field]: value }));
	}

	return (
		<Container
			sx={{
				bgcolor: 'primary.main',
				paddingBottom: 2,
				borderBottomLeftRadius: 5,
				borderBottomRightRadius: 5
			}}
		>
			<Container sx={{ bgcolor: 'white', borderRadius: 2 }}>
				<Container
					sx={{ textAlign: "center", paddingTop: 1 }}
				>
					<Typography variant='h3'>
						Search Eviction Database
					</Typography>
				</Container>
				<Form method="POST">
					<Stack alignItems='center' className="search">
						<TextField
							required
							id="searchName"
							name="searchName"
							onChange={handleChange}
							value={searchValues.searchName || ''}
							fullWidth
							autoFocus
							placeholder="Name"
							label="Name"
							sx={{ margin: 1 }}
						/>
						<TextField
							id="searchPhone"
							name="searchPhone"
							onChange={handleChange}
							value={searchValues.searchPhone || ''}
							fullWidth
							placeholder="Phone Number"
							label="Phone Number"
							sx={{ margin: 1 }}
						/>
						<TextField
							id="searchEmail"
							name="searchEmail"
							onChange={handleChange}
							value={searchValues.searchEmail || ''}
							fullWidth
							placeholder="Email (Optional)"
							label="Email"
							sx={{ margin: 1 }}
						/>
						<Button
							variant="contained"
							type="submit"
							sx={{ margin: 1 }}
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
			</Container>
			<Outlet />
		</Container>
	);
}

