import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import { authRoute, userRoute, conversationRoute, messageRoute } from "@/routes";

dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("can't connect to mongodb: ", err));

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

io.on("connection", (socket) => {
  console.log(`Connected user: ${socket.id}`);
  socket.on("message", (data) => {
    console.log(`user sent a message: ${data.content}`)
    socket.join(data.chat_id);
    io.to(data.chat_id).emit("receive", data);
    // io.emit('message', data);
  });
  socket.on("typing", (data)=>{
    socket.join(data.chat_id)
    io.to(data.chat_id).emit("otherIsTyping", data);
  })
});

server.listen(8000, () => {
  console.log("Server is running on http://localhost:8000.");
});
