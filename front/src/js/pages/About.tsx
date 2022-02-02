import { IRootState } from 'js/interfaces/interface'
import { useSelector } from 'react-redux'
import {NotLogin} from 'js/cmps/NotLogin'

export const About = () => {
const user = useSelector((state:IRootState) => state.data.user)

if(!user) return <div className="load"><NotLogin/></div>
    return (
        <div className='user-container'>
            <div className="user-img">
                <img src='https://robohash.org/1@robohash.org?set=set4' alt=''/>
            </div>
            <div className="about">
                <div className="username"><span>username: </span>{user.username}</div>
                <div className="first-name"><span>first name: </span>{user.firstName}</div>
                <div className="last-name"><span>last name: </span>{user.lastName}</div>
                <div className="email"><span>email: </span>{user.email}</div>
                <div className="phone"><span>phone: </span>{user.phone}</div>
            </div>
            
        </div>
    )
}
