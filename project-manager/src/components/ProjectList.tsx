import React, { useState } from 'react';
import { Project } from '../models/Project';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
    projects: Project[];
    onEdit: (project: Project) => void;
    onDelete: (id: string) => void;
    onSelect: (project: Project) => void;
    onUpdate: (project: Project) => void;
    onAddProject: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onDelete, onUpdate, onSelect }) => {
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const handleEdit = (project: Project) => {
        setEditingProject(project);
    };

    const handleSave = async (project: Project) => {
        await onUpdate(project);
        setEditingProject(null); 
    };

    const handleCancel = () => {
        setEditingProject(null);
    };

    return (
        <div className='p-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {projects.map((project) => (
                    <div key={project.id} className='border p-4 rounded-lg shadow-md bg-white dark:bg-gray-800'>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-300'>{project.name}</h3>
                        <p className='text-gray-600 dark:text-gray-400'>{project.description}</p>
                        <div className='flex justify-between mt-4'>
                            <button
                                onClick={() => handleEdit(project)}
                                className='px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 w-32'>
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(project.id)}
                                className='px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-700 w-32'>
                                Delete
                            </button>
                            <button
                                onClick={() => onSelect(project)}
                                className='px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-32'>
                                Select
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {editingProject && (
                <div className='mt-4'>
                    <h2 className='text-xl font-bold text-gray-700 dark:text-gray-300 mb-4'>Edit Project</h2>
                    <ProjectForm project={editingProject} onSave={handleSave} />
                </div>
            )}
        </div>
    );
};

export default ProjectList;
