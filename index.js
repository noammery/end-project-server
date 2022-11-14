
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const eventRouter = require("./routes/eventRouter");
const departAdminRouter = require("./routes/departAdminRouter");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const { DB } = require("./config");
const cors = require("cors");
const benifitsRouter = require('./routes/bonusses')
const PORT = 5000;


app.use(cors());

app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);

  socket.on("join_room", () => {
    socket.join("1");
    console.log(`user${socket.id} joinned room 1`);
  });

  socket.on("send", (message) => {
    console.log(message);
    socket.to("1").emit("back", message);
  });

  socket.on(`disconnect`, () => {
    console.log(`User  ${socket.id} disconnect`);
  });
});

app.use("/auth", authRouter);

app.use("/add", eventRouter);

app.use("/departments", departAdminRouter);

app.use('/bonuses', benifitsRouter);

const start = async () => {
  try {
    await mongoose.connect(DB);
    server.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
