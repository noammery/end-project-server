const mongoose = require('mongoose')



const benifitsSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: false },
      link: {type: String, required: false},
      linktitle: {type: String, require: false},
      date: {type:Date, required: true}
    },
)


const Benifits = mongoose.model('Benifits', benifitsSchema);

module.exports = Benifits