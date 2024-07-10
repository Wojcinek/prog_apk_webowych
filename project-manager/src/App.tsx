import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import ProjectPage from './pages/ProjectPage'
import StoryPage from './pages/StoryPage'
import TaskPage from './pages/TaskPage'
import { User } from './models/User'
import UserService from './services/UserService'

const App: React.FC = () => {
	const [loggedInUser, setLoggedInUser] = useState<User | null>(UserService.getLoggedInUser())
	const [darkMode, setDarkMode] = useState(false)

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [darkMode])

	const handleLogin = (user: User) => {
		setLoggedInUser(user)
	}

	const handleLogout = () => {
		UserService.logout()
		setLoggedInUser(null)
	}

	const toggleDarkMode = () => {
		setDarkMode(!darkMode)
	}

	return (
		<Router>
			<Navbar />
			<main className='p-4'>
				{loggedInUser ? (
					<Routes>
						<Route path='/projects' element={<ProjectPage />} />
						<Route path='/stories/:projectId' element={<StoryPage />} />
						<Route path='/tasks/:storyId' element={<TaskPage />} />
					</Routes>
				) : (
					<LoginForm onLogin={handleLogin} />
				)}
			</main>
			{loggedInUser && (
				<button
					className='bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold absolute top-0 right-0 m-2'
					onClick={handleLogout}>
					Logout
				</button>
			)}
			<button
				className='absolute top-0 left-0 m-2 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-black font-semibold border border-gray-200 dark:border-purple-400'
				onClick={toggleDarkMode}>
				{darkMode ? '☀️' : '🌙'}
			</button>
		</Router>
	)
}

export default App
