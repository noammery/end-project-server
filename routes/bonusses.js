const Benifits = require("../models/bonusses.js");
const express = require("express");

const benifitsRouter = express.Router();

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
      .then((data) => res.json(data))
      .catch(next)
    : res.json({ error: "you have an error!!" });
});

benifitsRouter.delete("/delete/:title", (req, res, next) => {
  Benifits.findOneAndDelete({ title: req.params.title })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = benifitsRouter;
