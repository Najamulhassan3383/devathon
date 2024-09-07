import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/connectDb.js";
import cors from "cors";
import userRoutes from "./routes/user.js";
import emailRoutes from "./routes/email.js";
import s3Routes from "./routes/s3.js";



dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

connectDb();

app.use("/api/user", userRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/s3", s3Routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});