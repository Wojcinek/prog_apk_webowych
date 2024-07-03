import { User } from '../models/User'

class UserService {
	private static readonly STORAGE_KEY = 'loggedInUser'

	static getLoggedInUser(): User | null {
		const user = localStorage.getItem(this.STORAGE_KEY)
		return user ? JSON.parse(user) : null
	}

	static setLoggedInUser(user: User): void {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
	}

	static mockLoggedInUser(): void {
		const mockUser: User = {
			id: '1',
			firstName: 'Jan',
			lastName: 'Kowalksi',
		}
		this.setLoggedInUser(mockUser)
	}
}

export default UserService
