// LoginForm.tsx

import React, { useState } from 'react'
import UserService from '../services/UserService'
import { User } from '../models/User'

interface LoginFormProps {
	onLogin: (user: User) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const user = UserService.login(login, password)
			if (user) {
				onLogin(user)
				setMessage('Login successful!')
			} else {
				setMessage('Invalid login credentials')
			}
		} catch (error) {
			setMessage('Login failed! ' + (error as Error).message)
		}
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Login</label>
					<input type='text' value={login} onChange={(e) => setLogin(e.target.value)} required />
				</div>
				<div>
					<label>Password</label>
					<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
				</div>
				<button type='submit'>Login</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	)
}

export default LoginForm
