import { createSlice, configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import { IInitialState } from "js/interfaces/initialState";
import { AuthService } from "js/services/AuthService";
import { IUser } from "js/interfaces/user";
import { IData } from "js/interfaces/data";
import {ICar} from 'js/interfaces/car'
import { CarService } from "js/services/CarService";
import { ICarInfo } from "js/interfaces/carsCount";

export const initialState: IInitialState = {
    cars:[],
    user:null,
    carsCount:0
}

export const setLogin = createAsyncThunk('data/setLogin',async (user:IUser)=>{
    const data:IData = await AuthService.login(user)
    return data
})
export const setSignup = createAsyncThunk('data/setSignup',async (user:IUser)=>{
    const data:any = await AuthService.signUp(user)
    return data
})
export const setLogout = createAsyncThunk('data/setLogout',async ()=>{
    return null
})
export const setUser = createAsyncThunk('data/setUser',async (secret:string|undefined)=>{
    const user = await AuthService.getUser(secret)
    return user
})
export const setData = createAsyncThunk('data/setData', async (pagination:{page:number,size:number}) => {
    const data:ICarInfo = await CarService.query(pagination)
    return data
})
export const setDelete = createAsyncThunk('data/setDelete', async (carId?: String) => {
    const currCars:any = await CarService.deleteCar(carId)
    return currCars
})
export const setEdit = createAsyncThunk('data/setEdit', async (carsObj:{ editOrCreateCar: ICar, cars: ICar[] }) => {
    const currCars:ICar[] = await CarService.editOrCreateCar(carsObj)
    return currCars
})
export const setFilter = createAsyncThunk('data/setFilter', async (search:string) => {
    const currCars:any = CarService.filterCars(search)
    return currCars
})




export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setLogin.fulfilled, (state, action)=>{
                const {token,user} = action.payload
                state.user = user
                document.cookie = `secret=${token}`
            })
            .addCase(setSignup.fulfilled, (state, action)=>{
                const {token,user} = action.payload
                state.user = user
                document.cookie = `secret=${token}`
            })
            .addCase(setUser.fulfilled, (state, action)=>{
                state.user = action.payload
            })
            .addCase(setLogout.fulfilled, (state, action)=>{
                state.user = action.payload
            })
            .addCase(setData.fulfilled, (state, action) => {
                const {cars,carsCount}=action.payload
                state.cars = cars
                state.carsCount = carsCount
                
            })
            .addCase(setDelete.fulfilled, (state, action) => {
                state.cars = action.payload
            })
            .addCase(setEdit.fulfilled, (state, action) => {
                state.cars = action.payload
            })
            .addCase(setFilter.fulfilled, (state, action) => {
                const {cars,carsCount}=action.payload
                state.cars = cars
                state.carsCount = carsCount
            })
    }
})

const store = configureStore({
    reducer: {
        data: dataSlice.reducer
    }
})

type RootState = ReturnType<typeof store.getState>

export const selectCar = (state: RootState) => state.data

export default store