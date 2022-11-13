const {Schema, model} = require('mongoose')

const User = new Schema({
    email: {type:String, unique: true, required:true},
    password: {type:String, required:true},
    role: {type: String, ref: 'Role'},
    image: {type:String, required:true},
    fullname: {type:String, required:true},
    phone: {type:String, required:true},
    birthday: {type:String, required:true},
    department: {type:String, required:true},
    status: {type:String, default:"לא נמצא"},
    sex: {type:String, required:true},
})

module.exports = model('User', User)