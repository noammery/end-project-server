const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/authRouter");
const departAdminRouter = require("./routes/departAdminRouter");
const DepartmentNameRouter = require("./routes/departNameRouter");
const benifitsRouter = require("./routes/bonusRouter");

require('dotenv').config();
const PORT = process.env.PORT || 5000;


app.use(cors());

app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // console.log(`user ${socket.id} connected`);

  socket.on("join_room", () => {
    socket.join("1");
    // console.log(`user${socket.id} joinned room 1`);
  });

  socket.on("send", (message) => {
    socket.to("1").emit("back", message);
  });

  socket.on(`disconnect`, () => {
    // console.log(`User  ${socket.id} disconnect`);
  });
});

app.use("/auth", authRouter);

app.use("/name", DepartmentNameRouter);

app.use("/departments", departAdminRouter);

app.use("/bonuses", benifitsRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB);
    server.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
