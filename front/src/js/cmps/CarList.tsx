import React, { useCallback, useState } from 'react'
import { ICar } from 'js/interfaces/car'
import { CarPreview } from 'js/cmps/CarPreview'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from 'js/interfaces/interface'
import { PaginationService } from 'js/services/PaginationService'

export const CarList = (props: { cars: ICar[] }) => {
    const { cars } = props
    const carsCount = useSelector((state:IRootState) => state.data.carsCount)

    return (
<div className="cars">

            <div className='cars-container'>
                {cars.map((car: ICar, idx: number) => {
                    return <CarPreview car={car} key={idx} />
                })}
                </div>
                <div className="pagination">
                    <PaginationService carsCount={carsCount} />
            </div>
                </div>
    )
}
