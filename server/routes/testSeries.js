import express from 'express';
import { 
    getAllTestSeries, 
    getTestSeriesById, 
    getTestSeriesQuestions, 
    getSolvedQuestions 
} from '../controllers/testSeriesController.js';

import { verifyUser } from '../middlewares/verifyUser.js';
import * as zainContoller from '../controllers/testAndMcqs.js';

import * as chatControlelr from '../controllers/chat.js';

const router = express.Router();

// Get all test series (authenticated)
router.get('/', verifyUser, getAllTestSeries);

// Get a specific test series by ID (authenticated)
router.get('/:id', verifyUser, getTestSeriesById);

// Get questions for a specific test series (authenticated)
router.get('/:id/questions', verifyUser, getTestSeriesQuestions);

// Get solved questions for a specific test series and user (authenticated)
router.get('/:id/solved/:userId', verifyUser, getSolvedQuestions);

// Enroll in a test series (authenticated)
router.get('/enrollInTestSeries/:id', verifyUser, zainContoller.enrollInTestSeries);
router.get('/chat/:userID/:teacherID', verifyUser, chatControlelr.getChatByUserAndTeacher);

export default router;
