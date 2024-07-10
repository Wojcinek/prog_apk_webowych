import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectForm from '../components/ProjectForm'
import ProjectList from '../components/ProjectList'
import { Project } from '../models/Project'
import ProjectService from '../services/ProjectService'
import ActiveProjectService from '../services/ActiveProjectService'

const ProjectPage: React.FC = () => {
	const [projects, setProjects] = useState<Project[]>([])
	const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined)
	const navigate = useNavigate()

	useEffect(() => {
		setProjects(ProjectService.getAllProjects())
	}, [])

	const handleSaveProject = (project: Project) => {
		if (project.id === '') {
			ProjectService.saveProject(project)
		} else {
			ProjectService.updateProject(project)
		}
		setProjects(ProjectService.getAllProjects())
		setCurrentProject(undefined)
	}

	const handleEditProject = (project: Project) => {
		setCurrentProject(project)
	}

	const handleDeleteProject = (id: string) => {
		ProjectService.deleteProject(id)
		setProjects(ProjectService.getAllProjects())
	}

	const handleSelectProject = (project: Project) => {
		ActiveProjectService.setActiveProject(project)
		localStorage.setItem('selectedProject', JSON.stringify(project))
		navigate(`/stories/${project.id}`)
	}

	return (
		<div>
			<h1>Projects</h1>
			<ProjectForm project={currentProject} onSave={handleSaveProject} />
			<ProjectList
				projects={projects}
				onEdit={handleEditProject}
				onDelete={handleDeleteProject}
				onSelect={handleSelectProject}
			/>
		</div>
	)
}

export default ProjectPage
