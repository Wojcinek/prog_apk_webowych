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

	useEffect(() => {
		const fetchTasks = async () => {
			if (storyId) {
				const tasks = await TaskService.getTaskByStoryId(storyId)
				setTasks(tasks)
			}
		}
		fetchTasks()
	}, [storyId])

	const handleSaveTask = async (task: Task) => {
		if (task.id === '') {
			await TaskService.saveTask(task)
		} else {
			await TaskService.updateTask(task)
		}
		if (storyId) {
			const tasks = await TaskService.getTaskByStoryId(storyId)
			setTasks(tasks)
		}
		setCurrentTask(undefined)
	}

	const handleEditTask = (task: Task) => {
		setCurrentTask(task)
	}

	const handleDeleteTask = async (id: string) => {
		await TaskService.deleteTask(id)
		if (storyId) {
			const stories = await TaskService.getTaskByStoryId(storyId)
			setTasks(tasks)
		}
	}

	const handleUpdateTask = (task: Task) => {
		// TaskService.updateTask(task)
		// setTasks(TaskService.getAllTasks().filter((t) => t.storyId === storyId))
	}

	const handleAssignUser = (taskId: string, userId: string) => {
		// TaskService.assignUser(taskId, userId)
		// setTasks(TaskService.getAllTasks().filter((task) => task.storyId === storyId))
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
