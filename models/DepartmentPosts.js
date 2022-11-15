const mongoose = require('mongoose')


const departmentPostSchema = new mongoose.Schema({
    department: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    date: { type: String, require: true },
    image: { type: String, require: false }
})


const DepartmentPost = mongoose.model('departmentPost', departmentPostSchema);

module.exports = DepartmentPost


