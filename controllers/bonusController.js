const Benifits = require("../models/Benefits");
// const { validationResult } = require('express-validator')
require('dotenv').config()

class bonusController {
    async getBonuses (req, res) {
        const benifits = await Benifits.find();
        res.send(benifits);
        
    }


}
module.exports = new bonusController();
