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

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit, onDelete, onUpdate, storyId }) => {
	return (
		<div style={{ display: 'flex' }}>
			<div style={{ flex: 1 }}>
				<h3>Todo</h3>
				<TaskList
					tasks={tasks.filter((task) => task.status === 'todo')}
					onEdit={onEdit}
					onDelete={onDelete}
					onUpdate={onUpdate}
					storyId={storyId}
				/>
			</div>
			<div style={{ flex: 1 }}>
				<h3>Doing</h3>
				<TaskList
					tasks={tasks.filter((task) => task.status === 'doing')}
					onEdit={onEdit}
					onDelete={onDelete}
					onUpdate={onUpdate}
					storyId={storyId}
				/>
			</div>
			<div style={{ flex: 1 }}>
				<h3>Done</h3>
				<TaskList
					tasks={tasks.filter((task) => task.status === 'done')}
					onEdit={onEdit}
					onDelete={onDelete}
					onUpdate={onUpdate}
					storyId={storyId}
				/>
			</div>
		</div>
	)
}

export default TaskTable
