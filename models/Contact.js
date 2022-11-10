const {Schema, model} = require('mongoose')

const Contact = new Schema({
    image: {type:String, required:true},
    name: {type:String, required:true},
    description: {type:String, required:true},
    phone: {type:String, required:true},
    email: {type:String, required:true}
})

module.exports = model('Contact', Contact)