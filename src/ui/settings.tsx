import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Content, Label } from "../lib/styled";
import { ChangeEvent, useState } from "react";

export function SettingsPage() {
	const [formData, setFormData] = useState({ old_pw: '', new_pw: '', new_pw_confirm: '' })
	const [changed, setChanged] = useState(false)

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setFormData(({ ...formData, [e.target.name]: e.target.value }))
		setChanged(true)
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
			<Container sx={{ bgcolor: 'white', borderRadius: 2, paddingBottom: 2 }}>
				<Stack>
					<Typography variant='h5'>Settings</Typography>
					<Label>Change Password:</Label>
					<Button>
						<Content>Request Password Reset/Change</Content>
					</Button>
				</Stack>
			</Container>
		</Container>
	);
}