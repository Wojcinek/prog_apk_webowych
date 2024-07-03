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
		<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
			{projects.map((project) => (
				<div key={project.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
					<h3>{project.name}</h3>
					<p>{project.description}</p>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<button onClick={() => onEdit(project)}>Edit</button>
						<button onClick={() => onDelete(project.id)}>Delete</button>
						<button onClick={() => onSelect(project)}>Select</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default ProjectList
