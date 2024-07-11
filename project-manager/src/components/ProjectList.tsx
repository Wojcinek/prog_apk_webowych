import React from 'react'
import { Project } from '../models/Project'

interface ProjectListProps {
	projects: Project[]
	onEdit: (project: Project) => void
	onDelete: (id: string) => void
	onSelect: (project: Project) => void
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete, onSelect }) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 '>
			{projects.map((project) => (
				<div key={project.id} className='border p-4 rounded-lg shadow-md bg-white dark:bg-gray-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-gray-300'>{project.name}</h3>
					<p className='text-gray-600 dark:text-gray-400 rounded-full'>{project.description}</p>
					<div className='flex justify-between mt-4 dark:bg-gray-800 bg-white'>
						<button
							onClick={() => onEdit(project)}
							className='px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 w-32'>
							Edit
						</button>
						<button
							onClick={() => onDelete(project.id)}
							className='px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-700 w-32'>
							Delete
						</button>
						<button
							onClick={() => onSelect(project)}
							className='px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-32'>
							Select
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default ProjectList
