import React from 'react'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory,useParams } from "react-router-dom"
import { ICar} from "js/interfaces/car";
import { IRootState} from "js/interfaces/interface";
import { CarService } from "js/services/CarService";
import { setEdit } from "js/store";

export const CarForm = () => {
    const {carId}:any = useParams()
    let history = useHistory()
    const dispatch = useDispatch()
    const { cars } = useSelector((state:IRootState) => state.data)
    const [car, setCar] = useState<ICar>()
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (carId) {
            const currCar: any = CarService.getCarById(carId, cars)
            setCar(currCar)
        }
        setValue('editOrCreateCar', { manufacturer: car?.manufacturer, model: car?.model, des: car?.des, imgURL:car?.imgURL})
    }, [car])

    const onSubmit = handleSubmit((data)=>{
        const { editOrCreateCar } = data
        if(carId){
            editOrCreateCar._id = carId
        }
        dispatch(setEdit({ editOrCreateCar, cars }))
        history.push('/')
    })
    
    return (
        <div className='form-container'>
            '<form className='form' onSubmit={onSubmit}>
                <div>Manufacturer</div>
                <input {...register("editOrCreateCar.manufacturer")} />
                <div>Model</div>
                <input {...register("editOrCreateCar.model")} />
                <div>Description</div>
                <input {...register("editOrCreateCar.des")} />
                {!car && <>
                <div>Image</div>
                <input {...register("editOrCreateCar.imgURL")} />
                </>}
                <input type="submit" />
            </form>'
            <div className="backward btn" onClick={()=>history.push('/')}>
                <div className="backward-icon">
                &laquo;
                </div>
            </div>
        </div>
    )
}
