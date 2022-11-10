const {Schema, model} = require('mongoose')

const departmentPost = new Schema({
    image: {type:String},
    title: {type:String, required:true},
    description: {type:String, required:true},
    date: {type:Data, required:true}
})

module.exports = model('departmentPost', departmentPost)