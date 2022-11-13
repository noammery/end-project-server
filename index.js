const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter')
const eventRouter = require('./routes/eventRouter')
const departAdminRouter = require('./routes/departAdminRouter')
const { DB } = require("./config")
const cors = require('cors');
const benifitsRouter = require('./routes/bonusses')



const PORT = 5000

const app = express()

app.use(cors());

app.use(express.json())

app.use("/auth", authRouter)

app.use("/add", eventRouter)

app.use("/departments", departAdminRouter)

app.use('/bonuses', benifitsRouter);

const start = async () => {
    try {
        await mongoose.connect(DB)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()