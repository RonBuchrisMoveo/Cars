
import { IUser } from "../interface/user.interface"
const ObjectId = require('mongodb').ObjectId
const User = require('../models/user')

export async function add(user:IUser) {
    try {
        const newUser = await User.create(user)
        return newUser
    } catch (err) {
        throw err
    }
}

export async function getByUsername(username: string) {
    try {
        const user = await User.findOne({ username })
        return user
    } catch (err) {
        throw err
    }
}