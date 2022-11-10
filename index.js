const express = require(`express`);
const port = 3001;
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require(`cors`);
const bodyParser = require(`body-parser`);
require(`dotenv`).config();
import benifitsRouter from './routes/benifitsRoutes.js';

mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.e32pweb.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log(`Connected to Data-base`))
  .catch((err) => console.log(err));

app.use(cors());

app.use('/api/benifits', benifitsRouter);

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
