import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import StoryForm from '../components/StoryForm'
import StoryList from '../components/StoryList'
import { Story } from '../models/Story'
import StoryService, { addStory } from '../services/StoryService'
import ActiveStoryService from '../services/ActiveStoryService'

const StoryPage: React.FC = () => {
	const { projectId } = useParams<{ projectId: string }>()
	const [stories, setStories] = useState<Story[]>([])
	const [currentStory, setCurrentStory] = useState<Story | undefined>(undefined)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchStories = async () => {
			if (projectId) {
				const stories = await StoryService.getStoriesByProjectId(projectId)
				setStories(stories)
			}
		}
		fetchStories()
	}, [projectId])

	const handleSaveStory = async (story: Story) => {
		if (story.id === '') {
			await StoryService.saveStory(story)
		} else {
			await StoryService.updateStory(story)
		}
		if (projectId) {
			const stories = await StoryService.getStoriesByProjectId(projectId)
			setStories(stories)
		}
		setCurrentStory(undefined)
	}

	const handleAddStory = async (newStory: Story) => {
		if (projectId) {
			const addedStory = await addStory(newStory)
			const stories = await StoryService.getStoriesByProjectId(projectId)
			setStories(stories)
		} else {
			console.error('Error adding story:')
		}
	}

	const handleEditStory = (story: Story) => {
		setCurrentStory(story)
	}

	const handleDeleteStory = async (id: string) => {
		await StoryService.deleteStory(id)
		if (projectId) {
			const stories = await StoryService.getStoriesByProjectId(projectId)
			setStories(stories)
		}
	}

	const handleSelectStory = (story: Story) => {
		ActiveStoryService.setActiveStory(story)
		navigate(`/tasks/${story.id}`)
	}

	return (
		<div>
			<h1 className='text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4'>Stories</h1>
			<StoryForm story={currentStory} onSave={handleAddStory} projectId={projectId!} />
			<StoryList stories={stories} onEdit={handleEditStory} onDelete={handleDeleteStory} onSelect={handleSelectStory} />
		</div>
	)
}

export default StoryPage
