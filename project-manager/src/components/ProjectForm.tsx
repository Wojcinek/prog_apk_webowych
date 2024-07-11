import React, { useState } from 'react'
import { Project } from '../models/Project'
import { v4 as uuidv4 } from 'uuid'

interface ProjectFormProps {
	onAddProject: (project: Project) => void
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onAddProject }) => {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const newProject: Project = { id: uuidv4(), name, description }
		try {
			await onAddProject(newProject)
			setName('')
			setDescription('')
		} catch (error) {
			console.error('Error adding project:', error)
		}
	}

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
			<button type='submit' className='w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700'>
				Save
			</button>
		</form>
	)
}

export default ProjectForm
