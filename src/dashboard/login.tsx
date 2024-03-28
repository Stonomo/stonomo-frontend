import { useState } from 'react';
import { Form, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

export function SignIn() {
	const { login } = useAuth();
	const [failedLogin, setFailedLogin] = useState(false);

	async function handleSubmit(event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const user = {
			username: data.get('username'),
			password: data.get('password'),
		};
		login(user, () => setFailedLogin(true));
	}

	function Copyright() {
		return (
			<Container className='Copyright'
				sx={{
					textAlign: 'center',
					padding: 1
				}}>
				<Box
					sx={{ bgcolor: 'white', borderRadius: 2 }}>
					{'Copyright © '}
					<Link color='inherit' to='/'>
						Stonomo LLC
					</Link>{' '}
					{new Date().getFullYear()}
					{'.'}
				</Box>
			</Container>
		);
	}

	return (
		<Container
			sx={{ bgcolor: 'primary.main', borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
			<Container
				sx={{
					textAlign: 'center',
					bgcolor: 'white',
					borderRadius: 2
				}}>
				<Typography variant='h3'
					sx={{ paddingTop: 1 }}>
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
						fullWidth
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
						sx={{ margin: 1 }}
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
			</Container>
			<Copyright />
		</Container>
	);
}