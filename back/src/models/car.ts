import db from 'mongoose'


const carSchema = new db.Schema({
    manufacturer:String,
    model:String,
    imgURL:String,
    des:String,
})

module.exports = db.model('Car',carSchema)