import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { config } from "dotenv";
import http from "http";
import { Server as SocketServer } from "socket.io";

import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";

config();

const client = process.env.CLIENT_URL;
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: client,
    credentials: true,
  },
});

app.use(
  cors({
    origin: client,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api", postRoutes);
app.use("/api", commentRoutes);
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);

io.on("connection", (socket) => {
  socket.on("message", (body) => {
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(8),
    });
  });
});

export default { server, io, app };
