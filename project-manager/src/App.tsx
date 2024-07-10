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
import { createClient, Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from './lib/supabase'

const App: React.FC = () => {
	const [session, setSession] = useState<Session | null>(null)

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
			<button className='bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold absolute top-0 right-0 m-2'>
				Logout
			</button>
		</Router>
	)
}

export default App
