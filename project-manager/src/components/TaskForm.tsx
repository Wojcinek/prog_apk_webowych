import React, { useState, useEffect } from 'react'
import { Task } from '../models/Task'
import UserService from '../services/UserService'
import { User } from '../models/User'
import { v4 as uuidv4 } from 'uuid'

interface TaskFormProps {
	task?: Task
	onSave: (task: Task) => void
	storyId: string
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, storyId }) => {
	const [name, setName] = useState<string>(task ? task.name : '')
	const [description, setDescription] = useState<string>(task ? task.description : '')
	const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(task ? task.priority : 'low')
	const [estimatedTime, setEstimatedTime] = useState<number>(task ? task.estimatedTime : 0)
	const [status, setStatus] = useState<'todo' | 'doing' | 'done'>(task ? task.status : 'todo')
	const [assignedUser, setAssignedUser] = useState<string | undefined>(task ? task.assignedUser : undefined)
	const [users, setUsers] = useState<User[]>([])

	useEffect(() => {
		const fetchUsers = async () => {
			const allUsers = UserService.getAllUsers()
			const filteredUsers = allUsers.filter((user) => user.role !== 'admin')
			setUsers(filteredUsers)
		}
		fetchUsers()
	}, [])

	useEffect(() => {
		if (assignedUser && status === 'todo') {
			setStatus('doing')
		}
	}, [assignedUser])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const createdAt = new Date().toISOString()
		const startDate = new Date().toISOString()
		const endDate = new Date().toISOString()
		const newTask: Task = {
			id: uuidv4(),
			name,
			description,
			priority,
			storyId,
			estimatedTime,
			status,
			createdAt,
			startDate,
			endDate,
			assignedUser,
		}
		try {
			await onSave(newTask)
			setName('')
			setDescription('')
			setPriority('low')
			setEstimatedTime(0)
			setStatus('todo')
			setAssignedUser(undefined)
		} catch (error) {
			console.error('error addding task:', error)
			console.log(newTask)
		}
	}

	return (
		<form onSubmit={handleSubmit} className='max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md dark:bg-gray-800'>
			<div className='mb-4'>
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
			<div className='mb-4'>
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
			<div className='mb-4'>
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
			<div className='mb-4'>
				<label htmlFor='estimatedTime' className='block text-gray-700 dark:text-gray-300'>
					Estimated Time (hours)
				</label>
				<input
					type='number'
					id='estimatedTime'
					value={estimatedTime}
					onChange={(e) => setEstimatedTime(parseFloat(e.target.value))}
					className='mt-2 p-2 w-full border rounded-lg dark:bg-gray-700 dark:text-white'
				/>
			</div>
			<div className='mb-4'>
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
			<div className='mb-4'>
				<label htmlFor='assignedUser' className='block text-gray-700 dark:text-gray-300'>
					Assign User
				</label>
				<select
					id='assignedUser'
					value={assignedUser || ''}
					onChange={(e) => setAssignedUser(e.target.value)}
					className='mt-2 p-2 w-full border rounded-lg dark:bg-gray-700 dark:text-white'>
					<option value=''>Select User</option>
					{users.map((user) => (
						<option key={user.id} value={user.id}>
							{user.firstName} {user.lastName}
						</option>
					))}
				</select>
			</div>
			<button type='submit' className='w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700'>
				Save
			</button>
		</form>
	)
}

export default TaskForm
