const {Schema, model} = require('mongoose')

const DepartmentPost = new Schema({
    department:{type:String, require:true},
    title: {type:String, require:true},
    description: {type:String, require:true},
    date: {type:String, require:true},
    image: {type:String, require:true}
})

module.exports = model('DepartmentPost', DepartmentPost)