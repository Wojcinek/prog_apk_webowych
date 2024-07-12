import { Task } from '../models/Task'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../lib/supabase'

class TaskService {
	static async getAllTasks(): Promise<Task[]> {
		let { data, error } = await supabase.from('Task').select('*')
		if (error) throw error
		return data as Task[]
	}

	static async getTaskById(id: string): Promise<Task | null> {
		let { data, error } = await supabase.from('Task').select('*').eq('id', id).single()
		if (error) throw error
		return data as Task
	}

	static async getTaskByStoryId(storyId: string): Promise<Task[]> {
		let { data, error } = await supabase.from('Task').select('*').eq('storyId', storyId)
		if (error) throw error
		return data as Task[]
	}

	static async saveTask(task: Task): Promise<void> {
		task.id = uuidv4()
		let { error } = await supabase.from('Task').insert([task])
		if (error) throw error
	}

	static async updateTask(task: Task): Promise<void> {
		let { error } = await supabase.from('Task').update(task).eq('id', task.id)
		if (error) throw error
	}

	static async deleteTask(id: string): Promise<void> {
		let { error } = await supabase.from('Task').delete().eq('id', id)
		if (error) throw error
	}
}

export const addTask = async (task: Task): Promise<Task> => {
	const { data, error } = await supabase.from('Task').insert([task]).single()

	if (error) {
		console.error('Error adding task:', error)
		throw error
	}

	return data
}

export default TaskService
