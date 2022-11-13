const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const { validationResult } = require('express-validator')
const { secret } = require("../config")

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class authController {

    async registration(req, res) {
        try {
            // const errors = validationResult(req)

            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ message: "Validation error", errors })
            // }
            console.log(req.body);
            const {email, password, role, fullname, phone, birthday, department, sex, image, contract, adress} = req.body
            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: "User already exists" })
            }

            const hashPassword = bcrypt.hashSync(password, 7)
            const user = new User({ email, password:hashPassword, role, fullname, phone, birthday: new Date(), department, sex, image, contract, adress})
            await user.save()
            
            return res.json({ message: "User registered successfully" })

        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Registration error" })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: `User ${email} not found` })
            }

            const validPassword = bcrypt.compareSync(password, user.password)

            if (!validPassword) {
                return res.status(400).json({ message: `Invalid password` })
            }
            const token = generateAccessToken(user._id, user.role)
            const {role, image, fullname, phone, birthday, department, status, sex} = user
            return res.json({ token, role, image, fullname, email, phone, birthday, department, status, sex })

        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Login error" })
        }
    }
    async getUsers(req, res) {
        const sent = {}
        try {
            const users = await User.find()

            res.json(users)
        } catch (e) {
            console.log(e);
        }
    }

    async makeAdmin(req, res){
        try {
            
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = new authController()       