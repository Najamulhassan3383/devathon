import User from "../models/UserSchema.js";
import TestSeries from "../models/TestSeriesSchema.js";
import MSQs from "../models/MSQsSchema.js";
import Chat from "../models/ChatSchema.js";
import SolvedQuestion from "../models/SolvedQuestionSchema.js";

import { authorizeRoles, verifyUser } from "../middlewares/verifyUser.js";


export async function addTestSeriesWithQuestions(req, res) {
    try {
        const { test_series_name, description, questions, isPaid, price } = req.body;

        if (!test_series_name || !questions || questions.length === 0) {
            return res.status(400).json({ message: "Test series name and questions are required" });
        }

        // First, create the questions and store them
        const createdQuestions = await Promise.all(
            questions.map(async (questionData) => {
                const newQuestion = new MSQs({
                    question: questionData.question,
                    options: questionData.options,
                    correct_answers: questionData.correct_answers,
                    subject: questionData.subject,
                });
                return await newQuestion.save();
            })
        );

        // Then, create the test series
        const newTestSeries = new TestSeries({
            teachersID: req.user.id, // Teacher ID comes from authenticated user
            test_series_name,
            description,
            questions: createdQuestions.map(q => q._id), // Link created questions to test series
            isPaid: isPaid || false,
            price: isPaid ? price : 0,
        });

        const savedTestSeries = await newTestSeries.save();

        res.status(201).json({
            success: true,
            message: "Test series created successfully",
            testSeries: savedTestSeries
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


export async function getTestSeries(req, res) {
    try {
        const testSeries = await TestSeries.find();

        if (!testSeries) {
            return res.status(404).json({ message: "No test series found" });
        }

        res.status(200).json({ success: true, testSeries });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function getTestSeriesById(req, res) {
    try {
        const testSeries = await TestSeries.findById(req.params.id).populate("questions");

        if (!testSeries) {
            return res.status(404).json({ message: "Test series not found" });
        }

        res.status(200).json({ success: true, testSeries });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function getTestSeriesByTeacherId(req, res) {
    try {
        const testSeries = await TestSeries.find({ teachersID: req.params.id });

        if (!testSeries) {
            return res.status(404).json({ message: "No test series found" });
        }

        res.status(200).json({ success: true, testSeries });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function updateTestSeries(req, res) {
    try {
        const testSeries = await TestSeries.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!testSeries) {
            return res.status(404).json({ message: "Test series not found" });
        }

        res.status(200).json({ success: true, testSeries });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}


//add new question to test series
export async function addQuestionToTestSeries(req, res) {
    try {
        const testSeries = await TestSeries.findById(req.params.id);

        if (!testSeries) {
            return res.status(404).json({ message: "Test series not found" });
        }

        const newQuestion = new MSQs(req.body);
        const savedQuestion = await newQuestion.save();

        testSeries.questions.push(savedQuestion._id);
        await testSeries.save();

        res.status(201).json({ success: true, message: "Question added to test series" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//delete question from test series
export async function deleteQuestionFromTestSeries(req, res) {
    try {
        const testSeries = await TestSeries.findById(req.params.id);

        if (!testSeries) {
            return res.status(404).json({ message: "Test series not found" });
        }

        const questionId = req.params.questionId;
        testSeries.questions = testSeries.questions.filter(q => q.toString() !== questionId);
        await testSeries.save();

        await MSQs.findByIdAndDelete(questionId);

        res.status(200).json({ success: true, message: "Question deleted from test series" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//write aroute so user enroll in test series if test series is free
export async function enrollInTestSeries(req, res) {
    try {
        const testSeries = await TestSeries.findById(req.params.id);

        if (!testSeries) {
            return res.status(404).json({ message: "Test series not found" });
        }

        if (testSeries.isPaid) {
            return res.status(400).json({ message: "This test series is paid" });
        }

        const user = await User.findById(req.user.id);

        if (user.test_series.includes(req.params.id)) {
            return res.status(400).json({ message: "You are already enrolled in this test series" });
        }

        user.test_series.push(req.params.id);
        await user.save();

        res.status(200).json({ success: true, message: "Enrolled in test series" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//write a route so user can unenroll from test series
export async function unenrollFromTestSeries(req, res) {
    try {
        const testSeries = await TestSeries.findById(req.params.id);

        if (!testSeries) {
            return res.status(404).json({ message: "Test series not found" });
        }

        const user = await User.findById(req.user.id);

        if (!user.test_series.includes(req.params.id)) {
            return res.status(400).json({ message: "You are not enrolled in this test series" });
        }

        user.test_series = user.test_series.filter(ts => ts.toString() !== req.params.id);
        await user.save();

        res.status(200).json({ success: true, message: "Unenrolled from test series" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//write a route to get all the test series enrolled by a user
export async function getTestSeriesEnrolledByUser(req, res) {
    try {
        const user = await User.findById(req.user.id).populate("test_series");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ success: true, testSeries: user.test_series });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}


export async function solveQuestion(req, res) {
    try {
        const { questionId, userAnswer } = req.body;

        // Find the question
        const question = await MSQs.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Check if the answer is correct
        const isCorrect = question.correct_answers === userAnswer;

        // Track the solved question in the database
        const solvedQuestion = new SolvedQuestion({
            userID: req.user.id, // user solving the question
            questionID: questionId,
            testSeriesID: req.params.testSeriesId, // assuming testSeriesId is passed in params
            correct: isCorrect
        });

        await solvedQuestion.save();

        res.status(200).json({
            success: true,
            message: isCorrect ? "Correct answer!" : "Incorrect answer.",
            solvedQuestion
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

