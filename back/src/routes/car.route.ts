import { addCar, getCars, removeCar, updateCar, filterCars } from '../conroller/car.controller'
import express from 'express'
import extractJWT from '../middleware/extractJWT'

export const carRouters = express.Router()

carRouters.get('/page=:page&size=:size',extractJWT, getCars)
carRouters.post('/search/page=:page&size=:size',extractJWT, filterCars)
carRouters.post('/',extractJWT, addCar)
carRouters.put('/:id',extractJWT, updateCar)
carRouters.delete('/:id',extractJWT, removeCar)