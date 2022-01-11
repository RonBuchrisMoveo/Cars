import express, { Application, Request, Response } from 'express'
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

import { ConnectionOptions } from 'mongoose'

    // Database Name
    const dbName: string = 'data_db'
    var dbURL: string = 'mongodb://localhost/'

const app: Application = express()
app.use(express.json())
app.use(cors())


const options: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

const CONNECTION_URL = process.env.CONNECTION_URL

import {authRouters} from './routes/auth.route'
import {carRouters} from './routes/car.route'

app.use('/api/auth',authRouters)
app.use('/api/car',carRouters)

const PORT = process.env.PORT || 3030;
app.listen((PORT),
async () => await mongoose.connect(dbURL+dbName,options))