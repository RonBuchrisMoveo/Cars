import { ICar } from 'js/interfaces/car'
import { IRootState } from 'js/interfaces/interface'
import { IUser } from 'js/interfaces/user'
import { setDelete } from 'js/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const CarPreview = (props:{car:ICar}) => {
    const {car} = props
    const dispatch = useDispatch()
    const user = useSelector((state:IRootState) => state.data.user)


    const onDelete = (carId?: String) => {
        dispatch(setDelete(carId))
    }

    return (
        <div className='car-container'>
            <div className="car-img">
                <img src={car.imgURL} alt=''/>
            </div>
            <div className="car-details">
                <div className="manufacturer">{car.manufacturer}</div>
                <div className="model">{car.model}</div>
                <div className="des">{car.des}</div>
            </div>
            {user.isAdmin && <div className="car-actions">
            <Link to={`/edit/${car._id}`}>
                    <div className="car-update btn">update</div>
                </Link>
                <div className="car-delete btn" onClick={() => onDelete(car._id)}>delete</div>
            </div>}
        </div>
    )
}
