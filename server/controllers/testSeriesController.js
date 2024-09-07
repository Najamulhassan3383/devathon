import TestSeries from '../models/TestSeriesSchema.js';
import MSQs from '../models/MSQsSchema.js';
import SolvedQuestion from '../models/SolvedQuestionSchema.js';

// Get all test series
export const getAllTestSeries = async (req, res) => {
    try {
        const testSeries = await TestSeries.find().populate('teachersID', 'email');
        res.json(testSeries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get a specific test series by ID
export const getTestSeriesById = async (req, res) => {
    try {
        const testSeries = await TestSeries.findById(req.params.id)
            .populate('teachersID', 'email')
            .populate('questions');
        if (!testSeries) {
            return res.status(404).json({ message: 'Test series not found' });
        }
        res.json(testSeries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get questions for a specific test series
export const getTestSeriesQuestions = async (req, res) => {
    try {
        const testSeries = await TestSeries.findById(req.params.id).populate('questions');
        if (!testSeries) {
            return res.status(404).json({ message: 'Test series not found' });
        }
        res.json(testSeries.questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get solved questions for a specific test series and user
export const getSolvedQuestions = async (req, res) => {
    try {
        const solvedQuestions = await SolvedQuestion.find({
            testSeriesID: req.params.id,
            userID: req.params.userId
        }).populate('questionID');
        res.json(solvedQuestions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};