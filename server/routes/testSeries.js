import express from "express";
import {
  getAllTestSeries,
  getTestSeriesById,
  getTestSeriesQuestions,
  getSolvedQuestions,
} from "../controllers/testSeriesController.js";
import {
  getTeacherTestSeries,
  enrollInTestSeries,
} from "../controllers/testAndMcqs.js";
import { addTestSeriesWithQuestions } from "../controllers/testAndMcqs.js";
import { verifyUser } from "../middlewares/verifyUser.js";

import * as chatController from '../controllers/chat.js';

const router = express.Router();

// Get all test series (authenticated)
router.get("/", verifyUser, getAllTestSeries);
router.get("/teacher", verifyUser, getTeacherTestSeries);

router.post("/addTestSeries", verifyUser, addTestSeriesWithQuestions);

// Get a specific test series by ID (authenticated)
router.get("/:id", verifyUser, getTestSeriesById);

// Get questions for a specific test series (authenticated)
router.get("/:id/questions", verifyUser, getTestSeriesQuestions);

// Get solved questions for a specific test series and user (authenticated)
router.get("/:id/solved/:userId", verifyUser, getSolvedQuestions);

// Get all test series created by the logged-in teacher

// Enroll in a test series (authenticated)
router.get("/enrollInTestSeries/:id", verifyUser, enrollInTestSeries);
router.get('/chat/:userID/:teacherID', verifyUser, chatController.getChatByUserAndTeacher);

export default router;
