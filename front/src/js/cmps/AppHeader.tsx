import { useRef } from "react"
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { setLogout } from "js/store"
import { useEffect } from "react"
import { IRootState } from "js/interfaces/interface"


export function AppHeader() {
    let history = useHistory()
    const dispatch = useDispatch()
    const secret = Cookies.get('secret')
    const user = useSelector((state: IRootState) => state.data.user)
    const toggler:any = useRef(null) 

    useEffect(() => {
    }, [user])

    
    const logout = () => {
        toggler.current.checked = false
        // Cookies.remove('secret')
        document.cookie = `secret=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        dispatch(setLogout())
        history.push('/login')
    }

    return (
        <header className="app-header">
            <div className="main-app">
                <div className="logo">
                    <div className="logo btn" onClick={() => history.push('/')}>LOGO</div>
                </div>
                <div className="hamburger-container btn">
                    <input ref={toggler} type="checkbox" className="toggler"/>
                    <div className="hamburger"><div></div></div>
                    <div className="menu">
                        <div>
                            <div>
                                <NavLink to={'/'}>
                                    <div className="car-list" onClick={()=>toggler.current.checked = false}>Cars</div>
                                </NavLink>
                                {secret ?
                                    <div className="logout btn" onClick={() => logout()}>Log out</div>
                                    : <NavLink to={'/login'}>
                                        <div className="login" onClick={()=>toggler.current.checked = false}>Log in</div>
                                    </NavLink>}
                                <NavLink to={'/about'}>
                                    <div className="about" onClick={()=>toggler.current.checked = false}>About</div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}