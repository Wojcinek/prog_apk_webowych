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

	static async saveTask(story: Task): Promise<void> {
		story.id = uuidv4()
		let { error } = await supabase.from('Story').insert([story])
		if (error) throw error
	}

	static async updateTask(story: Task): Promise<void> {
		let { error } = await supabase.from('Story').update(story).eq('id', story.id)
		if (error) throw error
	}

	static async deleteTask(id: string): Promise<void> {
		let { error } = await supabase.from('Story').delete().eq('id', id)
		if (error) throw error
	}
}

export default TaskService
