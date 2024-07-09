import React, { useState, useEffect } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import ProjectForm from './components/ProjectForm'
import ProjectList from './components/ProjectList'
import StoryForm from './components/StoryForm'
import StoryList from './components/StoryList'
import TaskTable from './components/TaskTable'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { User } from './models/User'
import { Project } from './models/Project'
import { Story } from './models/Story'
import { Task } from './models/Task'
import UserService from './services/UserService'
import ProjectService from './services/ProjectService'
import StoryService from './services/StoryService'
import TaskService from './services/TaskService'
import ActiveProjectService from './services/ActiveProjectService'

const App: React.FC = () => {
	const [projects, setProjects] = useState<Project[]>([])
	const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined)
	const [stories, setStories] = useState<Story[]>([])
	const [currentStory, setCurrentStory] = useState<Story | undefined>(undefined)
	const [tasks, setTasks] = useState<Task[]>([])
	const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined)
	const [loggedInUser, setLoggedInUser] = useState<User | null>(UserService.getLoggedInUser())
	const [darkMode, setDarkMode] = useState(false)
	const [isTaskTableVisible, setIsTaskTableVisible] = useState(true)

	useEffect(() => {
		UserService.mockUsers()
		setProjects(ProjectService.getAllProjects())
		const activeProject = ActiveProjectService.getActiveProject()
		if (activeProject) {
			setCurrentProject(activeProject)
			setStories(StoryService.getAllStories().filter((story) => story.projectId === activeProject.id))
		}
	}, [])

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [darkMode])

	const handleSaveProject = (project: Project) => {
		if (project.id === '') {
			ProjectService.saveProject(project)
		} else {
			ProjectService.updateProject(project)
		}
		setProjects(ProjectService.getAllProjects())
		setCurrentProject(undefined)
		setCurrentStory(undefined)
		setStories([])
		setTasks([])
		setIsTaskTableVisible(false)
	}

	const handleEditProject = (project: Project) => {
		setCurrentProject(project)
	}

	const handleDeleteProject = (id: string) => {
		ProjectService.deleteProject(id)
		setProjects(ProjectService.getAllProjects())
		ActiveProjectService.clearActiveProject()
		setCurrentProject(undefined)
		setCurrentStory(undefined)
		setStories([])
		setTasks([])
		setIsTaskTableVisible(false)
	}

	const handleSelectProject = (project: Project) => {
		ActiveProjectService.setActiveProject(project)
		setCurrentProject(project)
		setStories(StoryService.getAllStories().filter((story) => story.projectId === project.id))
		setCurrentStory(undefined)
		setTasks([])
		setIsTaskTableVisible(false)
	}

	const handleSelectStory = (story: Story) => {
		setCurrentStory(story)
		setTasks(TaskService.getAllTasks().filter((task) => task.storyId === story.id))
		setIsTaskTableVisible(true)
	}

	const handleSaveStory = (story: Story) => {
		if (story.id === '') {
			StoryService.saveStory(story)
		} else {
			StoryService.updateStory(story)
		}
		setStories(StoryService.getAllStories().filter((s) => s.projectId === (currentProject ? currentProject.id : '')))
		setCurrentStory(undefined)
		setTasks([])
		setIsTaskTableVisible(false)
	}

	const handleEditStory = (story: Story) => {
		setCurrentStory(story)
	}

	const handleDeleteStory = (id: string) => {
		StoryService.deleteStory(id)
		setStories(
			StoryService.getAllStories().filter((story) => story.projectId === (currentProject ? currentProject.id : ''))
		)
		setCurrentStory(undefined)
		setTasks([])
		setIsTaskTableVisible(false)
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

	const handleLogin = (user: User) => {
		setLoggedInUser(user)
	}

	const handleLogout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('refreshToken')
		localStorage.removeItem('loggedInUser')
		setLoggedInUser(null)
	}

	const toggleDarkMode = () => {
		setDarkMode(!darkMode)
	}

	const toggleTaskTableVisibility = () => {
		setIsTaskTableVisible(!isTaskTableVisible)
		if (!isTaskTableVisible) {
			setCurrentTask(undefined)
		}
	}

	return (
		<main>
			<div>
				{loggedInUser ? (
					<div>
						<h1>
							Welcome {loggedInUser.firstName} {loggedInUser.lastName}
						</h1>
						<button
							className='float-right bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold'
							onClick={handleLogout}>
							Logout
						</button>
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
								{isTaskTableVisible && (
									<>
										<h2>Kanban Board for {currentStory.name}</h2>
										<button
											className='bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold mb-2'
											onClick={toggleTaskTableVisibility}>
											Hide Task Table and Form
										</button>
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
									</>
								)}
							</>
						)}
					</div>
				) : (
					<LoginForm onLogin={handleLogin} />
				)}
			</div>
			<button
				className='absolute w-16 h-16 bottom-16 right-16 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-black font-semibold'
				onClick={toggleDarkMode}>
				{darkMode ? '☀️' : '🌙'}
			</button>
		</main>
	)
}

export default App
