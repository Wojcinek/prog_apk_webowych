import { v4 as uuidv4 } from 'uuid'
import { Project } from '../models/Project'

class ProjectService {
	private static readonly STORAGE_KEY = 'projects'

	static getAllProjects(): Project[] {
		const projects = localStorage.getItem(this.STORAGE_KEY)
		return projects ? JSON.parse(projects) : []
	}

	static saveProject(project: Project): void {
		const projects = this.getAllProjects()
		project.id = uuidv4()
		projects.push(project)
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects))
	}

	static updateProject(updatedProject: Project): void {
		let projects = this.getAllProjects()
		projects = projects.map((project) => (project.id === updatedProject.id ? updatedProject : project))
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects))
	}

	static deleteProject(id: string): void {
		const projects = this.getAllProjects().filter((project) => project.id !== id)
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects))
	}
}

export default ProjectService
