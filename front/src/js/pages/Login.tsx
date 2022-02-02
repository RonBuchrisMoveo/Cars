import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setData, setLogin, setSignup } from 'js/store';
import { IRootState } from 'js/interfaces/interface';
import { useHistory } from 'react-router';
import { validateEmail } from 'js/services/AuthService'


export const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state: IRootState) => state.data.user)
    const { register, handleSubmit } = useForm({})
    const [isSignUp, setIsSignUp] = useState<boolean>(false)
    const [userMsg, setuserMsg] = useState(true)
    const [userMsgPassword, setUserMsgPassword] = useState(true)

    const onSubmit = handleSubmit((data: any) => {
        if (isSignUp) {
            const validatePassword = (data.password).length >= 8;
            const validateMail = validateEmail(data.email)
            if (!validateMail || !validatePassword) {
                switch (true) {
                    case (!validateMail):
                    case (!validatePassword): {
                        setuserMsg(validateMail)
                        setUserMsgPassword(validatePassword)
                        break;
                    }
                }
                return
            }
            dispatch(setSignup(data))
        } else {
            dispatch(setLogin(data))
        }
            history.push('/')
    })


    return (
        <div className='login-container'>
            {!user && <div className={` ${isSignUp ? 'container signup' : "container"}`}>
                <div className="login-header">{isSignUp ? `Sign Up` : `Log in`}</div>
                <form className='form' onSubmit={onSubmit}>
                    <div className="username">username</div>
                    <input {...register("username")} />
                    <div className="password">
                        password
                        {!userMsgPassword && <div className='unvalid-msg'>*unvalid password</div>}
                    </div>
                    <input type='password' {...register("password")} />
                    {isSignUp && <>
                        <div className="full-name">
                            <div className="first-name">first name</div>
                            <input {...register("firstName")} />
                            <div className="last-name">last name</div>
                            <input {...register("lastName")} />
                        </div>
                        <div className="email">
                            email
                            {!userMsg && <div className='unvalid-msg'>*unvalid email</div>}
                        </div>
                        <input {...register("email")} />
                        <div className="phone">phone</div>
                        <input {...register("phone")} />
                    </>}
                    <input className='submit-btn' type="submit" />
                </form>
                <div className="sign-up btn" onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? `Sign in` : `Sign up`}</div>
            </div>}
        </div>
    )
}
