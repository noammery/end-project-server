const mongoose = require('mongoose')


const departmentPostSchema = new mongoose.Schema({
    department: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    date: { type: String, require: true },
    image: { type: String, require: true },
    publish:{type: Boolean, require: true}
})


const DepartmentPost = mongoose.model('departmentPost', departmentPostSchema);

module.exports = DepartmentPost


