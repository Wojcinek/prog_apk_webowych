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
		<form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
			<div style={{ marginBottom: '10px' }}>
				<label htmlFor='name'>Name</label>
				<input
					type='text'
					id='name'
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={{ width: '100%', padding: '5px' }}
				/>
			</div>
			<div style={{ marginBottom: '10px' }}>
				<label htmlFor='description'>Description</label>
				<input
					type='text'
					id='description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					style={{ width: '100%', padding: '5px' }}
				/>
			</div>
			<button type='submit' style={{ padding: '5px 10px' }}>
				Save
			</button>
		</form>
	)
}

export default ProjectForm
