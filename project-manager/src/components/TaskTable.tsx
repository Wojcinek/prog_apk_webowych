import React from 'react'
import { Task } from '../models/Task'
import TaskList from './TaskList'

interface TaskTableProps {
	tasks: Task[]
	onEdit: (task: Task) => void
	onDelete: (taskId: string) => void
	onUpdate: (task: Task) => void
	onAssignUser: (taskId: string, userId: string) => void
	storyId: string
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit, onDelete, onUpdate, onAssignUser, storyId }) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4'>
			<div>
				<h3 className='text-lg font-bold text-gray-700 dark:text-gray-300 mb-2'>To Do</h3>
				<TaskList
					tasks={tasks.filter((task) => task.status === 'todo')}
					onEdit={onEdit}
					onDelete={onDelete}
					onUpdate={onUpdate}
					onAssignUser={onAssignUser}
					storyId={storyId}
				/>
			</div>
			<div>
				<h3 className='text-lg font-bold text-gray-700 dark:text-gray-300 mb-2'>Doing</h3>
				<TaskList
					tasks={tasks.filter((task) => task.status === 'doing')}
					onEdit={onEdit}
					onDelete={onDelete}
					onUpdate={onUpdate}
					onAssignUser={onAssignUser}
					storyId={storyId}
				/>
			</div>
			<div>
				<h3 className='text-lg font-bold text-gray-700 dark:text-gray-300 mb-2'>Done</h3>
				<TaskList
					tasks={tasks.filter((task) => task.status === 'done')}
					onEdit={onEdit}
					onDelete={onDelete}
					onUpdate={onUpdate}
					onAssignUser={onAssignUser}
					storyId={storyId}
				/>
			</div>
		</div>
	)
}

export default TaskTable
