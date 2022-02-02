const bcrypt = require('bcrypt')
import { IUser } from 'interface/user.interface'
import { getByUsername, add } from './user.service'


export async function onLogin(username: string, password: string) {
    const user:IUser = await getByUsername(username)
    if (!user) return Promise.reject('Invalid username or password')
    const match=await bcrypt.compare(password, user.password)
    if(!match) return Promise.reject('Invalid username or password')

    return {
        username:user.username,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        phone:user.phone,
        isAdmin:user.isAdmin
    }
}

export async function signUp(username: string,firstName:string,lastName:string, password: string, email: string,phone:string) {
    const saltRounds = 10
    if (!username || !password || !email) return Promise.reject('fullname, username and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)

    return add({
    username,firstName,lastName, password: hash, email,
    phone,isAdmin:false
})
}