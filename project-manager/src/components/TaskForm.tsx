import React, { useState, useEffect } from 'react'
import { Task } from '../models/Task'
import UserService from '../services/UserService'
import { User } from '../models/User'

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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (assignedUser && status === 'doing') {
			setStatus('done')
		}

		const updatedTask: Task = {
			id: task ? task.id : '',
			name,
			description,
			priority,
			storyId,
			estimatedTime,
			status,
			createdAt: task ? task.createdAt : '',
			startDate: task ? task.startDate : undefined,
			endDate: task ? task.endDate : undefined,
			assignedUser,
		}

		onSave(updatedTask)

		setName('')
		setDescription('')
		setPriority('low')
		setEstimatedTime(0)
		setStatus('todo')
		setAssignedUser(undefined)
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Name</label>
				<input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
			</div>
			<div>
				<label>Description</label>
				<input type='text' value={description} onChange={(e) => setDescription(e.target.value)} required />
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
				<label>Estimated Time</label>
				<input type='number' value={estimatedTime} onChange={(e) => setEstimatedTime(parseFloat(e.target.value))} />
			</div>
			<div>
				<label>Status</label>
				<select value={status} onChange={(e) => setStatus(e.target.value as 'todo' | 'doing' | 'done')}>
					<option value='todo'>To Do</option>
					<option value='doing'>Doing</option>
					<option value='done'>Done</option>
				</select>
			</div>
			<div>
				<label>Assign User</label>
				<select value={assignedUser || ''} onChange={(e) => setAssignedUser(e.target.value)}>
					<option value=''>Select User</option>
					{users.map((user) => (
						<option key={user.id} value={user.id}>
							{user.firstName} {user.lastName}
						</option>
					))}
				</select>
			</div>
			<button type='submit'>Save</button>
		</form>
	)
}

export default TaskForm
