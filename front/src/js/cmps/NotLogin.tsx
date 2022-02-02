import React from 'react'
import { useHistory } from 'react-router'

export const NotLogin = () => {
    const history = useHistory()

    return (
        <div className='not-login-container'>
            <div className="login-first">
                You are need to login or Sign-up first
            </div>
            <div className="login-here btn" onClick={() => history.push('/login')}>
                Click here
            </div>
        </div>
    )
}
