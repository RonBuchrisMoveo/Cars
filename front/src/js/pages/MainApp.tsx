import React, { useEffect } from "react"
import { IRootState } from "js/interfaces/interface"
import { useDispatch, useSelector } from "react-redux"
import Cookies from "js-cookie"
import { setData } from "js/store"
import { UserLogin } from "js/cmps/UserLogin"
import { UserNotLogin } from "js/cmps/UserNotLogin"

export const MainApp = () => {
    const {cars,user} = useSelector((state:IRootState) => state.data)
    const dispatch = useDispatch()
    const secret = Cookies.get('secret')
    const pagination = {
        page:1,
        size:10
    }
    useEffect(() => {
        if(secret)dispatch(setData(pagination))
    }, [secret])

    return (
        <div className='main-app'>
            {cars? <UserLogin cars={cars}/>:<UserNotLogin/>}
        </div>
    )
}
