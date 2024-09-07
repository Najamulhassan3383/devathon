import express from "express";
import {
  getAllTestSeries,
  getTestSeriesById,
  getTestSeriesQuestions,
  getSolvedQuestions,
} from "../controllers/testSeriesController.js";
import { getTeacherTestSeries } from "../controllers/testAndMcqs.js";
import { addTestSeriesWithQuestions } from "../controllers/testAndMcqs.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router();

// Get all test series
router.get("/", getAllTestSeries);
router.get("/teacher", verifyUser, getTeacherTestSeries);

router.post("/addTestSeries", verifyUser, addTestSeriesWithQuestions);

// Get a specific test series by ID
router.get("/:id", getTestSeriesById);

// Get questions for a specific test series
router.get("/:id/questions", getTestSeriesQuestions);

// Get solved questions for a specific test series and user
router.get("/:id/solved/:userId", getSolvedQuestions);

// Get all test series created by the logged-in teacher

export default router;
