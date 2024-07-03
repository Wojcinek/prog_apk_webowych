import React, { useState, useEffect } from 'react'
import { Story } from '../models/Story'
import UserService from '../services/UserService'

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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const loggedInUser = UserService.getLoggedInUser()
		if (loggedInUser) {
			onSave({
				id: story ? story.id : '',
				name,
				description,
				priority,
				projectId,
				createdAt: story ? story.createdAt : '',
				status,
				ownerId: loggedInUser.id,
			})
		}
		setName('')
		setDescription('')
		setPriority('low')
		setStatus('todo')
	}

	useEffect(() => {
		if (story) {
			setName(story.name)
			setDescription(story.description)
			setPriority(story.priority)
			setStatus(story.status)
		}
	}, [story])

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Name</label>
				<input type='text' value={name} onChange={(e) => setName(e.target.value)} />
			</div>
			<div>
				<label>Description</label>
				<input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
			</div>
			<div>
				<label>Priority</label>
				<select value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
					<option value='low'>Low</option>
					<option value='medium'>Medium</option>
					<option value='high'>High</option>
				</select>
			</div>
			<div>
				<label>Status</label>
				<select value={status} onChange={(e) => setStatus(e.target.value as 'todo' | 'doing' | 'done')}>
					<option value='todo'>To Do</option>
					<option value='doing'>Doing</option>
					<option value='done'>Done</option>
				</select>
			</div>
			<button type='submit'>Save</button>
		</form>
	)
}

export default StoryForm
