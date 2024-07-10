import React from 'react'
import { Story } from '../models/Story'

interface StoryListProps {
	stories: Story[]
	onEdit: (story: Story) => void
	onDelete: (id: string) => void
	onSelect: (story: Story) => void
}

const StoryList: React.FC<StoryListProps> = ({ stories, onEdit, onDelete, onSelect }) => {
	const filteredStories: { [key in 'todo' | 'doing' | 'done']: Story[] } = {
		todo: stories.filter((story) => story.status === 'todo'),
		doing: stories.filter((story) => story.status === 'doing'),
		done: stories.filter((story) => story.status === 'done'),
	}

	return (
		<div className='p-4'>
			{['todo', 'doing', 'done'].map((status) => (
				<div key={status} className='mb-4'>
					<h3 className='text-xl font-bold text-gray-700 dark:text-gray-300 mb-2 capitalize'>{status}</h3>
					<div className='space-y-2'>
						{filteredStories[status as 'todo' | 'doing' | 'done'].map((story) => (
							<div key={story.id} className='p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800'>
								<h4 className='text-lg font-semibold text-gray-900 dark:text-gray-300'>{story.name}</h4>
								<p className='text-gray-600 dark:text-gray-400'>{story.description}</p>
								<p className='text-gray-600 dark:text-gray-400'>Priority: {story.priority}</p>
								<p className='text-gray-600 dark:text-gray-400'>Owner ID: {story.ownerId}</p>
								<div className='flex justify-between mt-4 dark:bg-gray-800 bg-white'>
									<button
										onClick={() => onEdit(story)}
										className='px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700'>
										Edit
									</button>
									<button
										onClick={() => onDelete(story.id)}
										className='px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-700'>
										Delete
									</button>
									<button
										onClick={() => onSelect(story)}
										className='px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700'>
										Show Tasks
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}

export default StoryList
