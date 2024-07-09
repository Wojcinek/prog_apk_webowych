import React from 'react'
import { Task } from '../models/Task'
import TaskForm from './TaskForm'

interface TaskListProps {
	tasks: Task[]
	onEdit: (task: Task) => void
	onUpdate: (task: Task) => void
	onDelete: (taskId: string) => void
	storyId: string
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete, storyId }) => {
	const [editingTask, setEditingTask] = React.useState<Task | null>(null)

	const handleEdit = (task: Task) => {
		setEditingTask(task)
	}

	const handleSave = (task: Task) => {
		onUpdate(task)
		setEditingTask(null)
	}

	return (
		<div>
			{tasks.length === 0 ? (
				<p>No tasks available.</p>
			) : (
				<ul>
					{tasks.map((task) => (
						<li key={task.id}>
							<div>
								<h3>{task.name}</h3>
								<p>{task.description}</p>
								<p>Priority: {task.priority}</p>
								<p>Estimated Time: {task.estimatedTime} hours</p>
								<p>Status: {task.status}</p>
								<p>Assigned User: {task.assignedUser}</p>
								<button onClick={() => handleEdit(task)}>Edit</button>
								<button onClick={() => onDelete(task.id)}>Delete</button>
							</div>
						</li>
					))}
				</ul>
			)}
			{editingTask && (
				<div>
					<h2>Edit Task</h2>
					<TaskForm task={editingTask} onSave={handleSave} storyId={storyId} />
				</div>
			)}
		</div>
	)
}

export default TaskList
