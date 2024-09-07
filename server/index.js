import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/connectDb.js";
import cors from "cors";
import userRoutes from "./routes/user.js";
import emailRoutes from "./routes/email.js";
import s3Routes from "./routes/s3.js";
import testSeriesRoutes from "./routes/testSeries.js";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Chat from "./models/ChatSchema.js"; // Import all models
import "./models/TestSeriesSchema.js";
import "./models/MSQsSchema.js";
import "./models/SolvedQuestionSchema.js";
import { sign } from "crypto";
import User from './models/UserSchema.js'; // Import the User model



dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Connect to the database
connectDb();

// Routes

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Change this to your frontend URL
    methods: ["GET", "POST"],
  },
});

// Middleware to handle authentication for Socket.IO
io.use((socket, next) => {
  const token = socket.handshake.query.token;
  if (!token) {
    return next(new Error("Authentication error"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = { id: decoded.id };
    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinRoom", ({ chatID }) => {
    socket.join(chatID);
    console.log(`User joined room: ${chatID}`);
  });

  socket.on("leaveRoom", ({ chatID }) => {
    socket.leave(chatID);
    console.log(`User left room: ${chatID}`);
  });

  socket.on("sendMessage", async ({ userID, teacherID, message }) => {
    try {
      if (!userID || !teacherID) {
        throw new Error("UserID and TeacherID are required.");
      }

      const chatID = `${userID}-${teacherID}`;
      let chat = await Chat.findOne({ chatID });

      if (!chat) {
        chat = new Chat({ 
          chatID, 
          userID, 
          teacherID, 
          chat: [] 
        });
      }

      const newMessage = {
        senderID: socket.user.id,
        message,
        time: new Date(),
      };

      chat.chat.push(newMessage);
      await chat.save();

      io.to(chatID).emit("receiveMessage", newMessage);
      console.log("Message sent:", newMessage);
      
      // Send acknowledgement back to the client
      socket.emit("messageSent", { status: 'ok', message: newMessage });
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("messageSent", { status: 'error', message: "Error sending message" });
    }
  });

  // ... (rest of the socket.io code)
});

app.set("io", io);

app.use("/api/user", userRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/s3", s3Routes);
app.use("/api/test-series", testSeriesRoutes);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
