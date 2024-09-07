import TestSeries from '../models/TestSeriesSchema.js';
import MSQs from '../models/MSQsSchema.js';
import SolvedQuestion from '../models/SolvedQuestionSchema.js';
import User from "../models/UserSchema.js";


// Get all test series
export const getAllTestSeries = async (req, res) => {
    try {
        const testSeries = await TestSeries.find().populate('teachersID', 'email');
        const user = await User.findById(req.user.id); // Assuming `req.user` holds authenticated user info

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Check if the user has already joined each test series
        const testSeriesWithStatus = testSeries.map(test => {
            const isJoined = user.test_series.includes(test._id);
            return {
                ...test._doc,
                isJoined
            };
        });

        res.json(testSeriesWithStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific test series by ID with "joined" status
export const getTestSeriesById = async (req, res) => {
    try {
        const testSeries = await TestSeries.findById(req.params.id)
            .populate('teachersID', 'email')
            .populate('questions');

        if (!testSeries) {
            return res.status(404).json({ message: 'Test series not found' });
        }

        const user = await User.findById(req.user.id);
        const isJoined = user ? user.test_series.includes(testSeries._id) : false;

        res.json({
            ...testSeries._doc,
            isJoined
        });
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

export const getPendingApprovals = async (req, res) => {
    try {
        const pendingApprovals = await TestSeries.find({ isApproved: false }).populate("questions").populate("teachersID")
        res.json(pendingApprovals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const approveTestSeries = async (req, res) => {
    try {
        const testSeries = await TestSeries.findByIdAndUpdate(req.params.id, { isApproved: true });
        res.json(testSeries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};