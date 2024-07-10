import React, { useState } from 'react'

const Navbar = () => {
	const [nav, setNav] = useState(false)

	const handleNav = () => {
		setNav(!nav)
	}

	return (
		<nav className='bg-gray-50 dark:bg-gray-900'>
			<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
				<div className='relative flex h-16 items-center justify-between'>
					<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
						<div className='hidden sm:ml-6 sm:block'>
							<div className='flex space-x-4'>
								<a
									href='/projects'
									className='rounded-md px-3 py-2 text-sm font-medium text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white bg-gray-50 dark:bg-gray-900 border border-gray-500 dark:border-gray-50'>
									Projects
								</a>
								<a
									href='/stories'
									className='rounded-md px-3 py-2 text-sm font-medium text-gray-800 dark:text-gray-300 hover:text-white bg-gray-50 dark:bg-gray-900 border border-gray-500 dark:border-gray-50'>
									Stories
								</a>
								<a
									href='/tasks'
									className='rounded-md px-3 py-2 text-sm font-medium text-gray-800 dark:text-gray-300 hover:text-white bg-gray-50 dark:bg-gray-900 border border-gray-500 dark:border-gray-50'>
									Tasks
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
