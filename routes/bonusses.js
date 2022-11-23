const express = require("express");
const benifitsRouter = express.Router();

const Benifits = require("../models/Benefits");

benifitsRouter.post("/get", async (req, res) => {
  const benifits = await Benifits.find();
  res.send(benifits);
});

benifitsRouter.post("/update", (req, res, next) => {
  req.body.title &&
  req.body.description &&
  req.body.image &&
  req.body.link &&
  req.body.date &&
  req.body.linktitle
    ? Benifits.create(req.body)
        .then(res.json({ message: "הטבה עודכנה בהצלחה!" }))
        .catch(next)
    : res.json({ error: "שגיאה!" });
});

benifitsRouter.delete("/delete/:title", async (req, res, next) => {
  const trying = await Benifits.findOneAndDelete({ title: req.params.title });
  trying
    ? res.json({ message: "הטבה נמחקה בהצלחה" })
    : res.json({ message: "שגיאה" });
});

module.exports = benifitsRouter;
