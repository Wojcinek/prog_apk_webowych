import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import StoryForm from '../components/StoryForm'
import StoryList from '../components/StoryList'
import { Story } from '../models/Story'
import StoryService from '../services/StoryService'

const StoryPage: React.FC = () => {
	const { projectId } = useParams<{ projectId: string }>()
	const [stories, setStories] = useState<Story[]>([])
	const [currentStory, setCurrentStory] = useState<Story | undefined>(undefined)
	const navigate = useNavigate()

	useEffect(() => {
		const savedProject = localStorage.getItem('selectedProject')
		if (savedProject) {
			const project = JSON.parse(savedProject)
			if (project.id !== projectId) {
				navigate('/projects')
			}
		} else {
			navigate('/projects')
		}

		if (projectId) {
			setStories(StoryService.getAllStories().filter((story) => story.projectId === projectId))
		}
	}, [projectId, navigate])

	const handleSaveStory = (story: Story) => {
		if (story.id === '') {
			StoryService.saveStory(story)
		} else {
			StoryService.updateStory(story)
		}
		setStories(StoryService.getAllStories().filter((s) => s.projectId === projectId))
		setCurrentStory(undefined)
	}

	const handleEditStory = (story: Story) => {
		setCurrentStory(story)
	}

	const handleDeleteStory = (id: string) => {
		StoryService.deleteStory(id)
		setStories(StoryService.getAllStories().filter((story) => story.projectId === projectId))
	}

	const handleSelectStory = (story: Story) => {
		localStorage.setItem('selectedStory', JSON.stringify(story))
		navigate(`/tasks/${story.id}`)
	}

	return (
		<div>
			<h1 className='text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4'>Stories</h1>
			<StoryForm story={currentStory} onSave={handleSaveStory} projectId={projectId!} />
			<StoryList stories={stories} onEdit={handleEditStory} onDelete={handleDeleteStory} onSelect={handleSelectStory} />
		</div>
	)
}

export default StoryPage
