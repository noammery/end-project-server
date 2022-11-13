const {Schema, model} = require('mongoose')

const Social = new Schema({
    image: {type:String, required:true},
    name: {type:String, required:true},
    description: {type:String, required:true},
    link: {type:String, required:true}
})

module.exports = model('Social', Social)