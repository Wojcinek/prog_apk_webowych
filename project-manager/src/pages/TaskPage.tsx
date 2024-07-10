import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TaskForm from '../components/TaskForm'
import TaskTable from '../components/TaskTable'
import { Task } from '../models/Task'
import TaskService from '../services/TaskService'

const TaskPage: React.FC = () => {
	const { storyId } = useParams<{ storyId: string }>()
	const [tasks, setTasks] = useState<Task[]>([])
	const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined)
	const navigate = useNavigate()

	useEffect(() => {
		const savedStory = localStorage.getItem('selectedStory')
		if (savedStory) {
			const story = JSON.parse(savedStory)
			if (story.id !== storyId) {
				navigate('/projects')
			}
		} else {
			navigate('/projects')
		}

		if (storyId) {
			setTasks(TaskService.getAllTasks().filter((task) => task.storyId === storyId))
		}
	}, [storyId, navigate])

	const handleSaveTask = (task: Task) => {
		if (task.id === '') {
			TaskService.saveTask(task)
		} else {
			TaskService.updateTask(task)
		}
		setTasks(TaskService.getAllTasks().filter((t) => t.storyId === storyId))
		setCurrentTask(undefined)
	}

	const handleEditTask = (task: Task) => {
		setCurrentTask(task)
	}

	const handleDeleteTask = (id: string) => {
		TaskService.deleteTask(id)
		setTasks(TaskService.getAllTasks().filter((task) => task.storyId === storyId))
	}

	const handleUpdateTask = (task: Task) => {
		TaskService.updateTask(task)
		setTasks(TaskService.getAllTasks().filter((t) => t.storyId === storyId))
	}

	const handleAssignUser = (taskId: string, userId: string) => {
		TaskService.assignUser(taskId, userId)
		setTasks(TaskService.getAllTasks().filter((task) => task.storyId === storyId))
	}

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4'>Tasks</h1>
			<TaskForm task={currentTask} onSave={handleSaveTask} storyId={storyId!} />
			<TaskTable
				tasks={tasks}
				onEdit={handleEditTask}
				onDelete={handleDeleteTask}
				onUpdate={handleUpdateTask}
				onAssignUser={handleAssignUser}
				storyId={storyId!}
			/>
		</div>
	)
}

export default TaskPage
