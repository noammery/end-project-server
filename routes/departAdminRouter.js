const Router = require('express');
const router = new Router();
// const {check} = require('express-validator');
const controller = require('../controllers/departPostController');

router.post('/department-edit',//[
    // check('department','cant be empty').notEmpty(),
    // check('title','cant be empty').notEmpty(),
    // check('description','cant be empty').notEmpty(),
    // check('date' ,'cant be empty').notEmpty(),
    // check('image', 'only images files').notEmpty()
//], 
controller.createPost);



module.exports = router