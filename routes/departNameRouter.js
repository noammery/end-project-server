const Router = require ("express");
const router = new Router();
const controller = require('../controllers/departNameController');
const departName = require("../models/DepartmentName");


router.post("/setname",controller.setName);

router.post("/getnames", controller.getNames);

router.delete("/deletename", controller.deleteName);
  
module.exports = router;
