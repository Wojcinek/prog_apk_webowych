import { User } from '../models/User'
import { v4 as uuidv4 } from 'uuid'

class UserService {
	private static USERS_KEY = 'users'
	private static STORAGE_KEY = 'loggedInUser'

	static getLoggedInUser(): User | null {
		const users = localStorage.getItem(this.STORAGE_KEY)
		return users ? JSON.parse(users) : null
	}

	static getAllUsers(): User[] {
		const users = localStorage.getItem(this.USERS_KEY)
		return users ? JSON.parse(users) : []
	}

	static mockUsers(): void {
		const users: User[] = [
			{
				id: uuidv4(),
				firstName: 'Jan',
				lastName: 'Adminowski',
				role: 'admin',
			},
			{ id: uuidv4(), firstName: 'Jan', lastName: 'Developowski', role: 'devops' },
			{ id: uuidv4(), firstName: 'Jan', lastName: 'Developer', role: 'developer' },
		]
		localStorage.setItem(this.USERS_KEY, JSON.stringify(users))
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users[0]))
	}
}

export default UserService
