import React, { useState, useEffect } from 'react'
import { Project } from '../models/Project'

interface ProjectFormProps {
	project?: Project
	onSave: (project: Project) => void
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave }) => {
	const [name, setName] = useState(project ? project.name : '')
	const [description, setDescription] = useState(project ? project.description : '')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSave({ id: project ? project.id : '', name, description })
		setName('')
		setDescription('')
	}

	useEffect(() => {
		if (project) {
			setName(project.name)
			setDescription(project.description)
		}
	}, [project])

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
