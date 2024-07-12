import { Story } from '../models/Story'

class ActiveStoryService {
	private static readonly STORAGE_KEY = 'activeStory'

	static getActiveStory(): Story | null {
		const story = localStorage.getItem(this.STORAGE_KEY)
		return story ? JSON.parse(story) : null
	}

	static setActiveStory(story: Story): void {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(story))
	}

	static clearActiveStory(): void {
		localStorage.removeItem(this.STORAGE_KEY)
	}
}

export default ActiveStoryService
