import axios from "axios"
import { IUser } from "js/interfaces/user"
import { IData } from "js/interfaces/data"

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'

export const AuthService={
    login,
    getUser,
    validateEmail,
    signUp,
}

 async function login (user: IUser):Promise<IData> {
    try {
      const {data} = await axios.post(`${BASE_URL}auth/login`, user)
      return data
    }catch (err) {
      throw err
    }
  }

  async function getUser(secret:string | undefined){
    try{
      const {data} = await axios.get(`${BASE_URL}auth/validate`,{headers:{['authorization']:`Bearer ${secret}`}})
      return data
    }catch(err){
      throw err
    }
  }

  async function signUp(user: IUser):Promise<string> {
      try{
          const {data}:any = await axios.post(`${BASE_URL}auth/signup`, user)
          return data
        }catch(err){
            throw err
        }
  }

  export function validateEmail(email:any) {
    try{
      if (email.length > 26) return false
      const emailType = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailType.test(String(email).toLowerCase());
    }catch(err){
      throw err
    }
  }