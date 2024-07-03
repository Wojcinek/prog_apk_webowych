import './App.css'
import React, { useState, useEffect } from 'react'
import ProjectService from './services/ProjectService'
import { Project } from './models/Project'
import ProjectForm from './components/ProjectForm'
import ProjectList from './components/ProjectList'
import { Story } from './models/Story'
import UserService from './services/UserService'
import StoryService from './services/StoryService'
import ActiveProjectService from './services/ActiveProjectService'
import StoryForm from './components/StoryForm'
import StoryList from './components/StoryList'

const App: React.FC = () => {
	const [projects, setProjects] = useState<Project[]>([])
	const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined)
	const [stories, setStories] = useState<Story[]>([])
	const [currentStory, setCurrentStory] = useState<Story | undefined>(undefined)

	useEffect(() => {
		UserService.mockLoggedInUser()
		setProjects(ProjectService.getAllProjects())
		const activeProject = ActiveProjectService.getActiveProject()
		if (activeProject) {
			setCurrentProject(activeProject)
			setStories(StoryService.getAllStories().filter((story) => story.projectId === activeProject.id))
		}
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
		ActiveProjectService.clearActiveProject()
		setCurrentProject(undefined)
		setStories([])
	}

	const handleSelectProject = (project: Project) => {
		ActiveProjectService.setActiveProject(project)
		setCurrentProject(project)
		setStories(StoryService.getAllStories().filter((story) => story.projectId === project.id))
	}
	const handleSaveStory = (story: Story) => {
		if (story.id === '') {
			StoryService.saveStory(story)
		} else {
			StoryService.updateStory(story)
		}
		setStories(StoryService.getAllStories().filter((s) => s.projectId === (currentProject ? currentProject.id : '')))
		setCurrentStory(undefined)
	}

	const handleEditStory = (story: Story) => {
		setCurrentStory(story)
	}

	const handleDeleteStory = (id: string) => {
		StoryService.deleteStory(id)
		setStories(
			StoryService.getAllStories().filter((story) => story.projectId === (currentProject ? currentProject.id : ''))
		)
	}

	return (
		<div>
			<h1>Project Manager</h1>
			<ProjectForm project={currentProject} onSave={handleSaveProject} />
			<ProjectList
				projects={projects}
				onEdit={handleEditProject}
				onDelete={handleDeleteProject}
				onSelect={handleSelectProject}
			/>
			{currentProject && (
				<>
					<h2>Stories for {currentProject.name}</h2>
					<StoryForm story={currentStory} onSave={handleSaveStory} projectId={currentProject.id} />
					<StoryList stories={stories} onEdit={handleEditStory} onDelete={handleDeleteStory} />
				</>
			)}
		</div>
	)
}

export default App
