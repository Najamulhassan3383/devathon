import express from "express";
import { uploadFile } from "../config/configS3.js";
import { deleteFile, fileUpload } from "../controllers/s3.js";

const router = express.Router();

router.post("/upload", uploadFile.single("file"), fileUpload);
router.post("/delete", deleteFile);

export default router;