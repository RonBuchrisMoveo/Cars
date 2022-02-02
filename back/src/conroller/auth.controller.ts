import { NextFunction, Request, Response } from 'express'
import { signUp, onLogin } from '../services/auth.service'
import signJWT from '../function/signJWT'
import { IUser } from 'interface/user.interface'


export async function login(req: Request, res: Response) {
    const { username, password } = req.body
    try {
        const user: IUser = await onLogin(username, password)
        signJWT(user, (_error, token) => {
            if (_error) {
                return res.status(401).json({
                    message: 'Unauthorized',
                    error: _error
                })
            } else if (token) {
                return res.status(200).json({
                    message: 'Auth Successful',
                    token,
                    user: user
                })
            }

        })
    } catch (err) {
        res.status(401).send({ err: 'Failed to Login' })
    }
}

export async function signup(req: Request, res: Response) {
    try {
        const { username,firstName,lastName, password, email, phone } = req.body
        await signUp(username,firstName,lastName, password, email, phone)
        await login(req,res)
        return res.status(200).json
    } catch (err) {
        res.status(500).send({ err: 'Failed to signup' })
    }
}

export async function getUser(req: Request, res: Response): Promise<void> {
    const {username,firstName,lastName,email,phone,isAdmin} = res.locals.jwt
      try {
          const user = {
            username:username,
            firstName:firstName,
            lastName:lastName,
            email:email,
            phone:phone,
            isAdmin:isAdmin
        }
          res.json(user);
      } catch (err) {
          res.status(500).send({ err: 'Failed to get item' })
      }
  }