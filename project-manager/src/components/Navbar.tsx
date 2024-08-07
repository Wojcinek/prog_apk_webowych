import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
	const navigate = useNavigate()

	const handleStoriesClick = () => {
		const savedProject = localStorage.getItem('activeProject')
		if (savedProject) {
			const project = JSON.parse(savedProject)
			navigate(`/stories/${project.id}`)
		} else {
			navigate('/projects')
		}
	}

	return (
		<nav className=''>
			<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
				<div className='relative flex h-16 items-center justify-between'>
					<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
						<div className='hidden sm:ml-6 sm:block'>
							<div className='flex space-x-4'>
								<Link
									to='/projects'
									className='rounded-md px-3 py-2 text-sm font-medium text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white bg-gray-50 dark:bg-gray-900 border border-gray-500 dark:border-gray-50'>
									Projects
								</Link>
								<button
									onClick={handleStoriesClick}
									className='rounded-md px-3 py-2 text-sm font-medium text-gray-800 dark:text-gray-300 hover:text-white bg-gray-50 dark:bg-gray-900 border border-gray-500 dark:border-gray-50'>
									Stories
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
