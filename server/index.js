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
import Chat from "./models/ChatSchema.js";// Import all models
import './models/TestSeriesSchema.js';
import './models/MSQsSchema.js';
import './models/SolvedQuestionSchema.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Connect to the database
connectDb();

// Routes
app.use("/api/user", userRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/s3", s3Routes);
// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",  // Change this to your frontend URL
        methods: ["GET", "POST"]
    }
});

// Middleware to handle authentication for Socket.IO
io.use((socket, next) => {
    const token = socket.handshake.query.token;
    if (!token) {
        return next(new Error('Authentication error'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = { id: decoded.id };
        next();
    } catch (err) {
        next(new Error('Authentication error'));
    }
});

// Handle socket connections
io.on('connection', (socket) => {
    console.log('New client connected');

    // Join room based on chatID
    socket.on('joinRoom', async ({ chatID }) => {
        socket.join(chatID);
        console.log(`User ${socket.user.id} joined chat: ${chatID}`);
    });

    // Handle sending messages
    socket.on('sendMessage', async ({ chatID, message }) => {
        try {
            const senderID = socket.user.id;
            const chat = await Chat.findOne({ chatID });

            if (!chat) {
                return socket.emit('error', { message: 'Chat not found' });
            }

            // Add new message to chat
            const newMessage = {
                senderID,
                message,
                time: new Date()
            };

            chat.chat.push(newMessage);
            await chat.save();

            // Broadcast the message to everyone in the room
            io.to(chatID).emit('receiveMessage', { senderID, message, time: newMessage.time });

        } catch (error) {
            console.error(error);
            socket.emit('error', { message: 'Error sending message' });
        }
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


app.set('io', io);

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
