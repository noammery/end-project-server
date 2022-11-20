const {Schema, model} = require('mongoose')

const Event = new Schema({
    image: {type:String, required:true},
    name: {type:String, required:true},
    description: {type:String, required:true},
    date: {type:Date, required:true}
})

module.exports = model('Event', Event)