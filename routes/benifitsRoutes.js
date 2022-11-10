import express from 'express';
import Benifits from '../models/benifitsModel.js';
import Benifits from './models/benifitsModel.js';
import expressAsyncHandler from 'express-async-handler';

const benifitsRouter = express.Router();

benifitsRouter.get('/', async (req, res) => {
    const benifitsRouter = await Benifits.find();
    res.send(benifits);
  });

  benifitsRouter.post('/', isAdmin, expressAsyncHandler, (async (req, res) => {
    
    const newBenifits = new Benifits(
        {
        title:'sample name',
        description:'sample description',
        image: '/images/p1.jpg',
        link: 'sample link',
        date: 0,
    });
    const benifits = await newBenifits.save();
    res.send({message: "new benifit added", Benifits})
  })
  );



  benifitsRouter.delete('/', async (req, res) =>{
    const benifits = await Benifits.findById(req.params.id);
    if (benifits) {
        await benifits.remove();
        res.send({ message: 'benifit Deleted' });
      } else {
        res.status(404).send({ message: 'benifit Not Found'});
      }
    
  })
   
  export default benifitsRouter;


