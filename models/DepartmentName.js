const mongoose = require("mongoose");

const DepartmentNameScheme = new mongoose.Schema({
  theName: { type: String, required: true },
});

const DepartmentName = mongoose.model("DepartmentName", DepartmentNameScheme);
module.exports = DepartmentName;
