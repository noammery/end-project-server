const {Schema, model} = require('mongoose')

const User = new Schema({
    email: {type:String, unique: true, required:true},
    password: {type:String, required:true},
    role: {type: String, ref: 'Role'},
    fullname: {type:String, required:true},
    phone: {type:String, required:true},
    birthday: {type:Date, required:true},
    department: {type:String, required:true},
    sex: {type:String, required:true},
    image: {type:String, required:true},
    contract: {type:String, required:true},
    adress: {type:String, required:true},
    status: {type:String, default:"לא נמצא"}
})

module.exports = model('User', User)