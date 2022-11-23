const Router = require("express");
const router = new Router();
const controller = require("../controllers/bonusController");
const { check } = require('express-validator')
const roleMiddleware = require("../middlewares/roleMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");



router.post("/get", async (req, res) => {
  const benifits = await Benifits.find();
  res.send(benifits);
});

router.post("/update", (req, res, next) => {
  req.body.title &&
    req.body.description &&
    req.body.image &&
    req.body.link &&
    req.body.date &&
    req.body.linktitle
    ? Benifits.create(req.body)
      .then((data) => res.json(data))
      .catch(next)
    : res.json({ error: "you have an error!!" });
});

router.delete("/delete/:title", (req, res, next) => {
  Benifits.findOneAndDelete({ title: req.params.title })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
