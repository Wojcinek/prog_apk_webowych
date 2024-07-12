import React, { useState, useEffect } from 'react'
import { Story } from '../models/Story'
import { v4 as uuidv4 } from 'uuid'
import { jwtDecode } from 'jwt-decode'

interface StoryFormProps {
	story?: Story
	onSave: (story: Story) => void
	projectId: string
}

const StoryForm: React.FC<StoryFormProps> = ({ story, onSave, projectId }) => {
	const [name, setName] = useState<string>(story ? story.name : '')
	const [description, setDescription] = useState<string>(story ? story.description : '')
	const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(story ? story.priority : 'low')
	const [status, setStatus] = useState<'todo' | 'doing' | 'done'>(story ? story.status : 'todo')

	useEffect(() => {
		if (story) {
			setName(story.name)
			setDescription(story.description)
			setPriority(story.priority)
			setStatus(story.status)
		}
	}, [story])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const token = localStorage.getItem('token')
		if (!token) {
			console.error('token not found')
			return
		}
		const decodedToken: { id: string } = jwtDecode(token)
		const ownerId = decodedToken.id
		const createdAt = new Date().toISOString()
		const newStory: Story = { id: uuidv4(), name, description, priority, projectId, status, createdAt, ownerId }
		try {
			await onSave(newStory)
			setName('')
			setDescription('')
			setPriority('low')
			setStatus('todo')
		} catch (error) {
			console.error('Error adding story:', error)
		}
	}

	// 	const loggedInUser = UserService.getLoggedInUser()
	// 	if (loggedInUser) {
	// 		onSave({
	// 			id: story ? story.id : '',
	// 			name,
	// 			description,
	// 			priority,
	// 			projectId,
	// 			createdAt: story ? story.createdAt : '',
	// 			status,
	// 			ownerId: loggedInUser.id,
	// 		})
	// 	}
	// 	setName('')
	// 	setDescription('')
	// 	setPriority('low')
	// 	setStatus('todo')
	// }

	return (
		<form onSubmit={handleSubmit} className='max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md dark:bg-gray-800'>
			<div className='mb-4 dark:bg-gray-800 bg-white'>
				<label htmlFor='name' className='block text-gray-700 dark:text-gray-300'>
					Name
				</label>
				<input
					type='text'
					id='name'
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					className='mt-2 p-2 w-full border rounded-lg dark:bg-gray-700 dark:text-white'
				/>
			</div>
			<div className='mb-4 dark:bg-gray-800 bg-white'>
				<label htmlFor='description' className='block text-gray-700 dark:text-gray-300'>
					Description
				</label>
				<input
					type='text'
					id='description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
					className='mt-2 p-2 w-full border rounded-lg dark:bg-gray-700 dark:text-white'
				/>
			</div>
			<div className='mb-4 dark:bg-gray-800 bg-white'>
				<label htmlFor='priority' className='block text-gray-700 dark:text-gray-300'>
					Priority
				</label>
				<select
					id='priority'
					value={priority}
					onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
					className='mt-2 p-2 w-full border rounded-lg dark:bg-gray-700 dark:text-white'>
					<option value='low'>Low</option>
					<option value='medium'>Medium</option>
					<option value='high'>High</option>
				</select>
			</div>
			<div className='mb-4 dark:bg-gray-800 bg-white'>
				<label htmlFor='status' className='block text-gray-700 dark:text-gray-300'>
					Status
				</label>
				<select
					id='status'
					value={status}
					onChange={(e) => setStatus(e.target.value as 'todo' | 'doing' | 'done')}
					className='mt-2 p-2 w-full border rounded-lg dark:bg-gray-700 dark:text-white'>
					<option value='todo'>To Do</option>
					<option value='doing'>Doing</option>
					<option value='done'>Done</option>
				</select>
			</div>
			<button type='submit' className='w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 '>
				Add
			</button>
		</form>
	)
}

export default StoryForm
