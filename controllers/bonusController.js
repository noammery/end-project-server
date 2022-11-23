const Benifits = require("../models/Benefits");
// const { validationResult } = require('express-validator')
require('dotenv').config()

class bonusController {
    async getBonuses(req, res) {
        const benifits = await Benifits.find();
        res.send(benifits);

    }

    async createBonus (req, res)  {
        req.body.title &&
        req.body.description &&
        req.body.image &&
        req.body.link &&
        req.body.date &&
        req.body.linktitle
          ? Benifits.create(req.body)
              .then(res.json({ message: "הטבה עודכנה בהצלחה!" }))
              .catch(e)
          : res.json({ error: "שגיאה!" });
    }

    async deleteBonus (req, res) {
        const trying = await Benifits.findOneAndDelete({ title: req.params.title });
        trying
          ? res.json({ message: "הטבה נמחקה בהצלחה" })
          : res.json({ message: "שגיאה" });
    }

}
module.exports = new bonusController();
