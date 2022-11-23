const Router = require("express");
const router = new Router();
const controller = require("../controllers/bonusController");
const { check } = require('express-validator')
const roleMiddleware = require("../middlewares/roleMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");



router.post("/get", controller.getBonuses);

router.post("/update", controller.createBonus);

router.delete("/delete/:title", controller.deleteBonus);

module.exports = router;
