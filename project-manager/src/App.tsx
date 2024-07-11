import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import ProjectPage from './pages/ProjectPage'
import StoryPage from './pages/StoryPage'
import TaskPage from './pages/TaskPage'
import { Session } from '@supabase/supabase-js'
import supabase from './lib/supabase'

const App: React.FC = () => {
	const [session, setSession] = useState<Session | null>(null)
	const [darkMode, setDarkMode] = useState(false)

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [darkMode])

	const toggleDarkMode = () => {
		setDarkMode(!darkMode)
	}

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})

		return () => subscription.unsubscribe()
	}, [])

	if (!session) {
		return <LoginForm />
	}

	async function signOut() {
		const { error } = await supabase.auth.signOut()
	}

	return (
		<Router>
			<Navbar />
			<main className='p-4'>
				<Routes>
					<Route path='/projects' element={<ProjectPage />} />
					<Route path='/stories/:projectId' element={<StoryPage />} />
					<Route path='/tasks/:storyId' element={<TaskPage />} />
				</Routes>
			</main>
			<button
				className='bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold absolute top-0 right-0 m-2'
				onClick={signOut}>
				Logout
			</button>
			<button
				className='absolute top-0 left-0 m-2 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-black font-semibold border border-gray-200 dark:border-purple-400'
				onClick={toggleDarkMode}>
				{darkMode ? '☀️' : '🌙'}
			</button>
		</Router>
	)
}

export default App
