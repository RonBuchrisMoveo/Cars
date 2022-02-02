import { ICarInfo } from "interface/carInfo.interface"
import { ICar } from "../interface/car.interface"
const ObjectId = require('mongodb').ObjectId
const Car = require('../models/car')


export async function query(page: number = 0, size: number = 0, filterBy: string = ''): Promise<ICarInfo> {
    let criteria:any ={}
    if (filterBy.length) {
        criteria = _buildCriteria(filterBy)
    }
    const skip = (page - 1) * size
    const carsCount:number = await Car.countDocuments(criteria)
    const cars: ICar[] = await Car.find(criteria).limit(size).skip(skip)
    const carsInfo:ICarInfo = {
        cars:cars,
        carsCount:carsCount
    }
    return carsInfo
}

export async function add(car: ICar): Promise<ICar> {
    try {
        const newCar = await Car.create(car)
        return newCar
    } catch (err) {
        throw err
    }
}

export async function remove(carId: string,): Promise<ICarInfo> {
    try {
        await Car.deleteOne({ '_id': ObjectId(carId) })
        const currCars: ICarInfo = await query()
        return currCars
    } catch (err) {
        throw err
    }
}

export async function update(car: ICar): Promise<ICar> {
    var id: string = ObjectId(car._id)
    delete car._id
    try {
        await Car.update({ "_id": id }, { $set: { ...car } })
        car._id = id
        return car
    } catch (err) {
        throw err
    }
}

function _buildCriteria(filterBy:string) {
    let criteria:any = {}
    criteria.$or =[  
        {
            manufacturer: {$regex : new RegExp(filterBy),$options:'i'}
        },
        {
            model: {$regex : new RegExp(filterBy),$options:'i'}
        },
        {
            des: {$regex : new RegExp(filterBy),$options:'i'}
        }
    ]
    return criteria;
}