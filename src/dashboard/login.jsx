import { useState } from 'react';
import { Form, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

function Copyright() {
	return (
		<div className='Copyright' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='/'>
				Stonomo LLC
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</div>
	);
}

export function SignIn() {
	const { login } = useAuth();
	const [failedLogin, setFailedLogin] = useState(false);

	async function handleSubmit(event) {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const user = {
			username: data.get('username'),
			password: data.get('password'),
		};
		login(user, () => setFailedLogin(true));
	}

	return (
		<Container>
			<Box>
				<Typography variant='h3'>
					Sign in
				</Typography>
				<Form onSubmit={handleSubmit} noValidate >
					<TextField
						fullWidth
						required
						id='username'
						label='Username'
						type='username'
						name='username'
						autoComplete='username'
						autoFocus
						margin='dense'
						placeholder='Username'
					/>
					<TextField
						required
						name='password'
						label='Password'
						type='password'
						id='password'
						margin='dense'
						autoComplete='current-password'
						placeholder='Password'
					/>
					<Button
						type='submit'
						variant='contained'
					>
						Sign In
					</Button>
					<Box className='invalidLogin' hidden={!failedLogin}>
						Incorrect Login Information
					</Box>
					{/*<ul>
						 <li>
							<Link href='#'>
								Forgot password?
							</Link>
						</li>
						<li>
							<Link href='#'>
								{'Don't have an account? Sign Up'}
							</Link>
						</li> 
					</ul>*/}
				</Form>
			</Box>
			<Copyright />
		</Container>
	);
}