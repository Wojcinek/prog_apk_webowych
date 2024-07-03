import { Story } from '../models/Story'
import { v4 as uuidv4 } from 'uuid'

class StoryService {
	private static readonly STORAGE_KEY = 'stories'

	static getAllStories(): Story[] {
		const stories = localStorage.getItem(this.STORAGE_KEY)
		return stories ? JSON.parse(stories) : []
	}

	static saveStory(story: Story): void {
		const stories = this.getAllStories()
		story.id = uuidv4()
		story.createdAt = new Date().toLocaleDateString()
		stories.push(story)
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stories))
	}

	static updateStory(updatedStory: Story): void {
		let stories = this.getAllStories()
		stories = stories.map((story) => (story.id === updatedStory.id ? updatedStory : story))
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stories))
	}

	static deleteStory(id: string): void {
		const stories = this.getAllStories().filter((story) => story.id !== id)
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stories))
	}
}

export default StoryService
