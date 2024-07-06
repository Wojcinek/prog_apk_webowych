import './App.css'
import React, { useState, useEffect } from 'react'
import ProjectService from './services/ProjectService'
import { Project } from './models/Project'
import ProjectForm from './components/ProjectForm'
import ProjectList from './components/ProjectList'
import { Story } from './models/Story'
import { Task } from './models/Task'
import UserService from './services/UserService'
import StoryService from './services/StoryService'
import TaskService from './services/TaskService'
import ActiveProjectService from './services/ActiveProjectService'
import StoryForm from './components/StoryForm'
import StoryList from './components/StoryList'
import TaskList from './components/TaskList'
import TaskTable from './components/TaskTable'
import TaskForm from './components/TaskForm'

const App: React.FC = () => {
	const [projects, setProjects] = useState<Project[]>([])
	const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined)
	const [stories, setStories] = useState<Story[]>([])
	const [currentStory, setCurrentStory] = useState<Story | undefined>(undefined)
	const [tasks, setTasks] = useState<Task[]>([])
	const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined)

	useEffect(() => {
		UserService.mockUsers()
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
		setTasks([])
	}

	const handleSelectProject = (project: Project) => {
		ActiveProjectService.setActiveProject(project)
		setCurrentProject(project)
		setStories(StoryService.getAllStories().filter((story) => story.projectId === project.id))
		setTasks([])
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
		setTasks([])
	}

	const handleSelectStory = (story: Story) => {
		setCurrentStory(story)
		setTasks(TaskService.getAllTasks().filter((task) => task.storyId === story.id))
	}

	const handleSaveTask = (task: Task) => {
		if (task.id === '') {
			TaskService.saveTask(task)
		} else {
			TaskService.updateTask(task)
		}
		setTasks(TaskService.getAllTasks().filter((t) => t.storyId === (currentStory ? currentStory.id : '')))
		setCurrentTask(undefined)
	}

	const handleEditTask = (task: Task) => {
		setCurrentTask(task)
	}

	const handleDeleteTask = (id: string) => {
		TaskService.deleteTask(id)
		setTasks(TaskService.getAllTasks().filter((task) => task.storyId === (currentStory ? currentStory.id : '')))
	}

	const handleUpdateTask = (task: Task) => {
		TaskService.updateTask(task)
		setTasks(TaskService.getAllTasks().filter((t) => t.storyId === (currentStory ? currentStory.id : '')))
	}

	const handleAssignUser = (taskId: string, userId: string) => {
		const updatedTask = TaskService.assignUser(taskId, userId)
		if (updatedTask.status === 'todo') {
			updatedTask.status = 'doing'
			TaskService.updateTask(updatedTask)
			setTasks((prevTasks) => prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
		} else {
			TaskService.updateTask(updatedTask)
			setTasks((prevTasks) => prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
		}
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
					<StoryList
						stories={stories}
						onEdit={handleEditStory}
						onDelete={handleDeleteStory}
						onSelect={handleSelectStory}
					/>
				</>
			)}
			{currentStory && (
				<>
					<h2>Kanban Board for {currentStory.name}</h2>
					<TaskTable
						tasks={tasks}
						onEdit={handleEditTask}
						onDelete={handleDeleteTask}
						onUpdate={handleUpdateTask}
						onAssignUser={handleAssignUser}
						storyId={currentStory.id}
					/>
					<h2>Tasks for {currentStory.name}</h2>
					<TaskForm task={currentTask} onSave={handleSaveTask} storyId={currentStory.id} />
					<TaskList
						tasks={tasks}
						onEdit={handleEditTask}
						onDelete={handleDeleteTask}
						onUpdate={handleUpdateTask}
						storyId={currentStory.id}
					/>
				</>
			)}
		</div>
	)
}

export default App
