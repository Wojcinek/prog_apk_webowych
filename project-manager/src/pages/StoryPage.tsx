import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import StoryForm from '../components/StoryForm'
import StoryList from '../components/StoryList'
import { Story } from '../models/Story'
import StoryService, { addStory } from '../services/StoryService'
import ActiveStoryService from '../services/ActiveStoryService'

const StoryPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [stories, setStories] = useState<Story[]>([]);
    const [currentStory, setCurrentStory] = useState<Story | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStories = async () => {
            if (projectId) {
                const stories = await StoryService.getStoriesByProjectId(projectId);
                setStories(stories);
            }
        };
        fetchStories();
    }, [projectId]);

    const handleAddStory = async (newStory: Story) => {
        try {
            await addStory(newStory);
            const stories = await StoryService.getStoriesByProjectId(projectId!);
            setStories(stories);
        } catch (error) {
            console.error('Error adding story:', error);
        }
    };

    const handleEditStory = (story: Story) => {
        setCurrentStory(story);
    };

    const handleUpdateStory = async (story: Story) => {
        try {
            await StoryService.updateStory(story);
            const stories = await StoryService.getStoriesByProjectId(projectId!);
            setStories(stories);
            setCurrentStory(undefined);
        } catch (error) {
            console.error('Error updating story:', error);
        }
    };

    const handleDeleteStory = async (id: string) => {
        await StoryService.deleteStory(id);
        const stories = await StoryService.getStoriesByProjectId(projectId!);
        setStories(stories);
    };

    const handleSelectStory = (story: Story) => {
        ActiveStoryService.setActiveStory(story);
        navigate(`/tasks/${story.id}`);
    };

    return (
        <div>
            <h1 className='text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4'>Stories</h1>
            <StoryForm onSave={handleAddStory} projectId={projectId!} />
            <StoryList
                stories={stories}
                onEdit={handleEditStory}
                onDelete={handleDeleteStory}
                onSelect={handleSelectStory}
                onUpdate={handleUpdateStory}
                onAddStory={handleAddStory}
                projectId={projectId!}
            />
        </div>
    );
};

export default StoryPage;