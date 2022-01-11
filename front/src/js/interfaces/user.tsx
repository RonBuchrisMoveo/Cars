export interface IUser {
    _id?: String,
    name: string,
    password:string,
    email?: string,
    phone?: string,
    isAdmin?:Boolean
}