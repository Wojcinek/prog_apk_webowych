import React from 'react'
import { Task } from '../models/Task'
import TaskForm from './TaskForm'

interface TaskListProps {
	tasks: Task[]
	onEdit: (task: Task) => void
	onUpdate: (task: Task) => void
	onDelete: (taskId: string) => void
	onAssignUser: (taskId: string, userId: string) => void
	storyId: string
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onUpdate, onAssignUser, storyId }) => {
	const [editingTask, setEditingTask] = React.useState<Task | null>(null)

	const handleEdit = (task: Task) => {
		setEditingTask(task)
	}

	const handleSave = (task: Task) => {
		onUpdate(task)
		setEditingTask(null)
	}

	return (
		<div className='p-4'>
			{tasks.length === 0 ? (
				<p className='text-gray-600 dark:text-gray-400'>No tasks available.</p>
			) : (
				<ul className='space-y-2'>
					{tasks.map((task) => (
						<li key={task.id} className='p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800'>
							<h4 className='text-lg font-semibold text-gray-900 dark:text-gray-300'>{task.name}</h4>
							<p className='text-gray-600 dark:text-gray-400'>{task.description}</p>
							<p className='text-gray-600 dark:text-gray-400'>Priority: {task.priority}</p>
							<p className='text-gray-600 dark:text-gray-400'>Estimated Time: {task.estimatedTime} hours</p>
							<p className='text-gray-600 dark:text-gray-400'>Status: {task.status}</p>
							<p className='text-gray-600 dark:text-gray-400'>Assigned User: {task.assignedUser}</p>
							<div className='flex justify-between mt-4 bg-white dark:bg-gray-800'>
								<button
									onClick={() => handleEdit(task)}
									className='px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 w-32'>
									Edit
								</button>
								<button
									onClick={() => onDelete(task.id)}
									className='px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-700 w-32'>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
			{editingTask && (
				<div className='mt-4'>
					<h2 className='text-xl font-bold text-gray-700 dark:text-gray-300 mb-4'>Edit Task</h2>
					<TaskForm task={editingTask} onSave={handleSave} storyId={storyId} />
				</div>
			)}
		</div>
	)
}

export default TaskList
