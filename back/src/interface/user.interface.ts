export interface IUser {
    _id?: string,
    username: string,
    firstName: string,
    lastName: string,
    password?:string,
    email: string,
    phone: string,
    isAdmin:Boolean
}
