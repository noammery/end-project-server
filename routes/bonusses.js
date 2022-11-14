
const Benifits = require('../models/bonusses.js')
const express = require('express')


const benifitsRouter = express.Router();

benifitsRouter.post(
  '/get', (async (req, res) => {
    const benifits = await Benifits.find();
    res.send(benifits);
  })
);



benifitsRouter.post('/update', (req, res, next) => {
  req.body.title && req.body.description && req.body.image && req.body.link && req.body.linktitle ?
    Benifits.create(req.body)
      .then((data) => res.json(data))
      .catch(next) :
    res.json({ error: 'you have an error' })
})



benifitsRouter.delete(
  '/delete', (async (req, res) => {
    const benifits = await Benifits.findOneAndDelete({ title: req.body.title });
    if (benifits) {
      res.send({ message: 'benifit Deleted' });
    } else {
      res.status(404).send({ message: 'benifit Not Found' });
    }

  })
);

module.exports = benifitsRouter


