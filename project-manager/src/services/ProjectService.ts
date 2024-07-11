import supabase from '../lib/supabase'
import { Project } from '../models/Project'

class ProjectUserService {
	static async saveProject(project: Project): Promise<void> {
		let { error } = await supabase.from('Project').insert([project])
		if (error) throw error
	}

	static async updateProject(project: Project): Promise<void> {
		let { error } = await supabase.from('Project').update(project).eq('id', project.id)
		if (error) throw error
	}

	static async deleteProject(id: string): Promise<void> {
		try {
			const { data, error } = await supabase.from('Project').delete().eq('id', id)

			if (error) {
				throw error
			}

			console.log('Project deleted:', data)
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('Error deleting project:', error.message)
			} else {
				console.error('An unknown error occurred while deleting the project.')
			}
		}
	}

	static async getAllProjects(): Promise<any[]> {
		try {
			const { data, error } = await supabase.from('Project').select('*')

			if (error) {
				throw error
			}

			return data
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('Error fetching projects:', error.message)
			} else {
				console.error('An unknown error occurred while fetching the projects.')
			}
			return []
		}
	}
}

export const addProject = async (project: Project): Promise<Project> => {
	const { data, error } = await supabase.from('Project').insert([project]).single()

	if (error) {
		console.error('Error adding project:', error)
		throw error
	}

	return data
}

export const editProject = async (project: Project): Promise<Project> => {
	try {
		const { data, error } = await supabase.from('Project').update(project).eq('id', project.id).single()

		if (error) {
			throw error
		}

		return data
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('Error updating project:', error.message)
		} else {
			console.error('An unknown error occurred while updating the project.')
		}
		throw error
	}
}

export default ProjectUserService
