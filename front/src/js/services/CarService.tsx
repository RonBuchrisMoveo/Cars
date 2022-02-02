import axios from 'axios'
import Cookies from 'js-cookie'
import { ICar } from 'js/interfaces/car'
const BASE_URL = process.env.NODE_ENV === 'production'
? '/api/'
: '//localhost:3030/api/'
export const CarService = {
    query,
    deleteCar,
    editOrCreateCar,
    getCarById,
    filterCars
}

async function query(pagination:any) {
    const {page,size} = pagination
    const secret = Cookies.get('secret')
    try{
        const { data } = await axios.get(`${BASE_URL}car/page=${page}&size=${size}`,{headers:{['authorization']:`Bearer ${secret}`}})
        return data
    }catch(err){
        throw err
    }
}

async function deleteCar(carId?: String): Promise<ICar> {
    const secret = Cookies.get('secret')
    try{
        const data = await axios.delete(`${BASE_URL}car/${carId}`,{headers:{['authorization']:`Bearer ${secret}`}})
        const currCars = data.data
        return currCars
    }catch(err){
        throw err
    }
}

async function editOrCreateCar(carsObj: { editOrCreateCar: ICar, cars: ICar[] }): Promise<ICar[]> {
    const secret = Cookies.get('secret')
    try{
        const { editOrCreateCar, cars } = carsObj
        if(editOrCreateCar._id){
            await axios.put(`${BASE_URL}car/${editOrCreateCar._id}`, editOrCreateCar,{headers:{['authorization']:`Bearer ${secret}`}})
            const carIdx = cars.findIndex(car => car._id === editOrCreateCar._id);
            cars.splice(carIdx, 1, editOrCreateCar);
            return cars
        }else{
            const {data} =await axios.post(`${BASE_URL}car`, editOrCreateCar,{headers:{['authorization']:`Bearer ${secret}`}})
            cars.push(data)
            return cars
        }
    }catch(err){
        throw err
    }
}

function getCarById(carId: String, cars: ICar[]): ICar |undefined{
    try{

        const currCar: ICar|undefined = cars.find((car: ICar) => {
            return car._id === carId
        })
        return currCar
    }catch(err){
        throw err
    }
}

async function filterCars(search:string){
    const secret = Cookies.get('secret')
    const {data} = await axios.post(`${BASE_URL}car/search/page=1&size=10`,{search},{headers:{['authorization']:`Bearer ${secret}`}})
    return data
}

