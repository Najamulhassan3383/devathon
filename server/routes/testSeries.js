import express from "express";
import {
  getAllTestSeries,
  getTestSeriesById,
  getTestSeriesQuestions,
  getSolvedQuestions,
  getPendingApprovals,
  approveTestSeries,
} from "../controllers/testSeriesController.js";
import {
  getTeacherTestSeries,
  enrollInTestSeries,
  postDiscussion
} from "../controllers/testAndMcqs.js";
import { addTestSeriesWithQuestions } from "../controllers/testAndMcqs.js";
import { verifyUser } from "../middlewares/verifyUser.js";

import * as chatController from '../controllers/chat.js';

import { submitTest } from '../controllers/testAndMcqs.js';

const router = express.Router();

// Get all test series (authenticated)
router.get("/", verifyUser, getAllTestSeries);
router.get("/teacher", verifyUser, getTeacherTestSeries);
router.get('/pending-approvals', getPendingApprovals);
router.put('/approve/:id', approveTestSeries);

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

router.get('/chat/:ID', verifyUser, chatController.getChatByUserOrTeacher);

// Submit test
router.post('/:id/submit', verifyUser, submitTest);

router.post('/discussion/:id', verifyUser, postDiscussion);

export default router;
