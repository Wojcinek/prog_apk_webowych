import React from 'react'
import { Story } from '../models/Story'

interface StoryListProps {
	stories: Story[]
	onEdit: (story: Story) => void
	onDelete: (id: string) => void
	onSelect: (story: Story) => void
}

type StoryStatus = 'todo' | 'doing' | 'done'

const StoryList: React.FC<StoryListProps> = ({ stories, onEdit, onDelete, onSelect }) => {
	const filteredStories: { [key in StoryStatus]: Story[] } = {
		todo: stories.filter((story) => story.status === 'todo'),
		doing: stories.filter((story) => story.status === 'doing'),
		done: stories.filter((story) => story.status === 'done'),
	}

	const statuses: StoryStatus[] = ['todo', 'doing', 'done']

	return (
		<div>
			{statuses.map((status) => (
				<div key={status}>
					<h3>{status.charAt(0).toUpperCase() + status.slice(1)}</h3>
					<ul>
						{filteredStories[status].map((story) => (
							<li key={story.id}>
								<h4>{story.name}</h4>
								<p>{story.description}</p>
								<p>Priority: {story.priority}</p>
								<p>Owner ID: {story.ownerId}</p>
								<button onClick={() => onEdit(story)}>Edit</button>
								<button onClick={() => onDelete(story.id)}>Delete</button>
								<button onClick={() => onSelect(story)}>Show Tasks</button>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	)
}

export default StoryList
