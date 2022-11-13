const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require('express-validator')
const roleMiddleware = require('../middlewares/roleMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')


router.post('/registration', [
    check('username', "can not be empty").notEmpty(),
    check('password', "need to be 4-10 symbols").isLength({min:4, max:10})
], controller.registration)

router.post('/login', controller.login)

router.get('/users',  controller.getUsers)

// router.put('/makeadmin/:username', authMiddleware, controller.makeAdmin)

module.exports = router