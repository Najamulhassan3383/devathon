import express from 'express';
import { 
    getAllTestSeries, 
    getTestSeriesById, 
    getTestSeriesQuestions, 
    getSolvedQuestions 
} from '../controllers/testSeriesController.js';

const router = express.Router();

// Get all test series
router.get('/', getAllTestSeries);

// Get a specific test series by ID
router.get('/:id', getTestSeriesById);

// Get questions for a specific test series
router.get('/:id/questions', getTestSeriesQuestions);

// Get solved questions for a specific test series and user
router.get('/:id/solved/:userId', getSolvedQuestions);

export default router;