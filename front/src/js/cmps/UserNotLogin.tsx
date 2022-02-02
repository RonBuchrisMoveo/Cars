import React from 'react'
import { Link } from 'react-router-dom'

export const UserNotLogin = () => {
    return (
        <div className='login-first'>
            <div className="title">
            Login first
            </div>
            <div className="login btn">
                <Link to={'/login'}>
                Login
                </Link>
            </div>
        </div>
    )
}
