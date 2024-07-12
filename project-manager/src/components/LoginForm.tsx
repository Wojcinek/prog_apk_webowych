import React, { useState } from 'react'

interface LoginFormProps{
	onLogin: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({onLogin}) => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const response = await fetch('http://localhost:3000/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ login, password }),
			});
			const data = await response.json();
			if (response.ok) {
				localStorage.setItem('token', data.token);
				localStorage.setItem('refreshToken', data.refreshToken);
				setMessage('Login successful');
				onLogin()
	  
			} else {
				setMessage('Login failed: ' + data.message);
				console.log(data);
			}
		} catch (error) {
			console.log(error);
			setMessage('Login failed:alalaal ');
	  
		}
	
	}

	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
				<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-6 space-y-4 md:space-y-6 sm:p-8'>
					Project Manager
				</h1>
				<div className='w-full bg-white rounded-lg shadow border dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<form className='space-y-4 md:space-y-6' action='#' onSubmit={handleSubmit}>
							<div>
								<label htmlFor='login' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
									Login
								</label>
								<input
									type='text'
									value={login}
									onChange={(e) => setLogin(e.target.value)}
									name='login'
									id='login'
									className='bg-gray-50 dark:bg-gray-700 border border-gray-300 text-gray-900 dark:text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
									required
								/>
							</div>
							<div>
								<label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
									Password
								</label>
								<input
									type='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									name='password'
									id='password'
									className='bg-gray-50 dark:bg-gray-700 border border-gray-300 text-gray-900 dark:text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
									required
								/>
							</div>
							<button
								type='submit'
								className='bg-gray-50 dark:bg-gray-700 border border-gray-300 text-gray-900 dark:text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'>
								Sign in
							</button>
						</form>
						{message && <p className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>{message}</p>}
					</div>
				</div>
			</div>
		</section>
	)
}

export default LoginForm
