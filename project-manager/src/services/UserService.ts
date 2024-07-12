import { User } from '../models/User'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../lib/supabase'

class UserService {
	private static USERS_KEY = 'users'
	private static STORAGE_KEY = 'loggedInUser'


	static async getAllUsers(): Promise<User[]> {
        const { data, error } = await supabase.from('User').select('*')
        if (error) {
            throw new Error(error.message)
        }
        return data as User[]
    }

    static async getUserByLogin(login:string): Promise<User |null>{
        const {data,error} = await supabase.from('User').select('*').eq('login',login).single()
        if(error || !data)return null
        return data as User
    }

	static logout(): void {
		localStorage.removeItem(this.STORAGE_KEY)
	}
}

export default UserService
