import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';
import { Project } from '../models/Project';
import ProjectService, { addProject } from '../services/ProjectService';
import ActiveProjectService from '../services/ActiveProjectService';

const ProjectPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            const projects = await ProjectService.getAllProjects();
            setProjects(projects);
        };
        fetchProjects();
    }, []);

    const handleAddProject = async (newProject: Project) => {
        try {
            const addedProject = await addProject(newProject);
            const projects = await ProjectService.getAllProjects();
            setProjects(projects);
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    const handleEditProject = (project: Project) => {
        setCurrentProject(project);
    };

    const handleUpdateProject = async (project: Project) => {
        try {
            await ProjectService.updateProject(project);
            const projects = await ProjectService.getAllProjects();
            setProjects(projects);
            setCurrentProject(undefined);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    const handleDeleteProject = async (id: string) => {
        await ProjectService.deleteProject(id);
        const projects = await ProjectService.getAllProjects();
        setProjects(projects);
    };

    const handleSelectProject = (project: Project) => {
        ActiveProjectService.setActiveProject(project);
        navigate(`/stories/${project.id}`);
    };

    return (
        <div>
            <h1 className='text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4'>Projects</h1>
            <ProjectForm onAddProject={handleAddProject} />
            <ProjectList
                projects={projects}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onSelect={handleSelectProject}
                onUpdate={handleUpdateProject}
                onAddProject={handleAddProject}
            />
        </div>
    );
};

export default ProjectPage;
