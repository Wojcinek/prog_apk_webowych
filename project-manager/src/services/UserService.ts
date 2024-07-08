import { User } from '../models/User'
import { v4 as uuidv4 } from 'uuid'

class UserService {
	private static USERS_KEY = 'users'
	private static STORAGE_KEY = 'loggedInUser'

	static mockUsers(): void {
		const mockUsers: User[] = [
			{ id: uuidv4(), firstName: 'Jan', lastName: 'Adminowski', role: 'admin', login: 'admin', password: 'admin' },
			{ id: uuidv4(), firstName: 'Jan', lastName: 'Developowski', role: 'devops', login: 'devops', password: 'devops' },
			{
				id: uuidv4(),
				firstName: 'Jan',
				lastName: 'Developer',
				role: 'developer',
				login: 'developer',
				password: 'developer',
			},
		]
		localStorage.setItem(this.USERS_KEY, JSON.stringify(mockUsers))
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mockUsers[0]))
	}

	static getAllUsers(): User[] {
		const users = localStorage.getItem(this.USERS_KEY)
		return users ? JSON.parse(users) : []
	}

	static getLoggedInUser(): User | null {
		const user = localStorage.getItem(this.STORAGE_KEY)
		return user ? JSON.parse(user) : null
	}

	static login(login: string, password: string): User | null {
		const users: User[] = this.getAllUsers()
		const user = users.find((u) => u.login === login && u.password === password)
		if (user) {
			localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
			return user
		}
		return null
	}

	static logout(): void {
		localStorage.removeItem(this.STORAGE_KEY)
	}
}

export default UserService
