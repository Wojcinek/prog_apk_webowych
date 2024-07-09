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
					<table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
						<thead>
							<tr>
								<th>Name</th>
								<th>Description</th>
								<th>Priority</th>
								<th>Owner ID</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{filteredStories[status].map((story) => (
								<tr key={story.id} style={{ borderBottom: '1px solid #ccc' }}>
									<td>{story.name}</td>
									<td>{story.description}</td>
									<td>{story.priority}</td>
									<td>{story.ownerId}</td>
									<td>
										<button onClick={() => onEdit(story)}>Edit</button>
										<button onClick={() => onDelete(story.id)}>Delete</button>
										<button onClick={() => onSelect(story)}>Show Tasks</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			))}
		</div>
	)
}

export default StoryList
