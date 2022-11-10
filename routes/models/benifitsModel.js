import mongoose from 'mongoose';



const benifitsSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: false },
      link: {type: String, required: false},
      date: {type: mongoose.Date, required: true}
    },
)


const Benifits = mongoose.model('Benifits', benifitsSchema);
export default Benifits;