
import { ICar } from "js/interfaces/car";
import { IUser } from "js/interfaces/user";

export interface IInitialState{
    cars:ICar[]
    user:IUser|null,
    carsCount:number
}