import express from "express";
import { sendEmail, sendOtp } from "../controllers/email.js";

const router = express.Router();

router.post("/send-common-email", sendEmail);
router.post("/send-otp", sendOtp);

export default router;