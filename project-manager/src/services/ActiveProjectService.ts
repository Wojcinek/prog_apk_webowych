import { Project } from '../models/Project'

class ActiveProjectService {
	private static readonly STORAGE_KEY = 'activeProject'

	static getActiveProject(): Project | null {
		const project = localStorage.getItem(this.STORAGE_KEY)
		return project ? JSON.parse(project) : null
	}

	static setActiveProject(project: Project): void {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(project))
	}

	static clearActiveProject(): void {
		localStorage.removeItem(this.STORAGE_KEY)
	}
}

export default ActiveProjectService
