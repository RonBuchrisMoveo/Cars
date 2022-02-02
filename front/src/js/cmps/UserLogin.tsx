import { CarList } from 'js/cmps/CarList'
import { ICar } from 'js/interfaces/car'
import { CarService } from 'js/services/CarService'
import { setData, setFilter } from 'js/store'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export const UserLogin = (props: { cars: ICar[] }) => {
    const { cars } = props
    const dispatch = useDispatch()
    const [searchBy, setSearchBy] = useState('')
    const [TIMER, setTIMER] = useState<number>()


    const handleChange = (value: string) => {
        if (TIMER) clearTimeout(TIMER);
        setSearchBy(value);
        let time:any = setTimeout(() => {
            dispatch(setFilter(value))
        }, 1000);
        setTIMER(time)
    }


    return (
        <div className="main-cars-container">

            <div className="search-add-container">

                <div className="search">
                    <form className='form'>
                        <input
                            className='search'
                            name='search'
                            id='search'
                            type='text'
                            placeholder='Search'
                            value={searchBy}
                            onChange={(e) => handleChange(e.target.value)} />
                    </form>
                </div>
                <div className="add-car btn">
                    <Link to={'/edit'}>
                        Add
                    </Link>
                </div>
            </div>
            <div>
                {cars.length > 0 ? <CarList cars={cars} /> :
                    <div className="not-fount-car">
                        The car that you lookin for NOT fount
                    </div>
                }
            </div>
        </div>
    )
}
