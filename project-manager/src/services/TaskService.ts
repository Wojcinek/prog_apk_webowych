import { Task } from '../models/Task'
import { v4 as uuidv4 } from 'uuid'

class TaskService {
	private static TASK_KEY = 'tasks'

	static getAllTasks(): Task[] {
		const tasks = localStorage.getItem(this.TASK_KEY)
		return tasks ? JSON.parse(tasks) : []
	}

	static saveTask(task: Task): void {
		const tasks = this.getAllTasks()
		task.id = uuidv4()
		task.createdAt = new Date().toLocaleDateString()
		tasks.push(task)
		localStorage.setItem(this.TASK_KEY, JSON.stringify(tasks))
	}

	static updateTask(updatedTask: Task): void {
		let tasks = this.getAllTasks()
		tasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
		localStorage.setItem(this.TASK_KEY, JSON.stringify(tasks))
	}

	static deleteTask(id: string): void {
		const tasks = this.getAllTasks().filter((tasks) => tasks.id !== id)
		localStorage.setItem(this.TASK_KEY, JSON.stringify(tasks))
	}

	static assignUser(taskId: string, userId: string): Task {
		let tasks = this.getAllTasks()
		const taskToUpdate = tasks.find((task) => task.id === taskId)
		if (taskToUpdate) {
			taskToUpdate.assignedUser = userId
			if (taskToUpdate.status === 'todo') {
				taskToUpdate.status = 'doing'
			}
			this.updateTask(taskToUpdate)
			return taskToUpdate
		} else {
			throw new Error(`Task with ID ${taskId} not found.`)
		}
	}
}

export default TaskService
