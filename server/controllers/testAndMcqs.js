import User from "../models/UserSchema.js";
import TestSeries from "../models/TestSeriesSchema.js";
import MSQs from "../models/MSQsSchema.js";
import Chat from "../models/ChatSchema.js";
import SolvedQuestion from "../models/SolvedQuestionSchema.js";
import { sendEmail } from "./email.js";

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

        // Notify all students by email
        const students = await User.find({ role: 'student' }); // Assuming 'role' field exists to identify students
        const emailPromises = students.map(student => {
            return sendEmail({
                to: student.email,
                subject: "New Test Series Added",
                html: `
                    <div>
                        <h1>New Test Series: ${test_series_name}</h1>
                        <p>A new test series has been added. You can now start practicing!</p>
                        <p>Description: ${description}</p>
                    </div>
                `
            });
        });

        await Promise.all(emailPromises); // Send all emails concurrently

        // Emit Socket.IO event to notify all students
        const io = req.app.get("io"); // Retrieve the Socket.IO instance from app
        io.emit("newTestSeries", {
            test_series_name,
            description,
            isPaid,
            price,
            message: `A new test series "${test_series_name}" has been added.`,
        });

        res.status(201).json({
            success: true,
            message: "Test series created successfully and students have been notified.",
            testSeries: savedTestSeries
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}


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


export async function addQuestionToTestSeries(req, res) {
    try {
        // Fetch the test series by ID
        const testSeries = await TestSeries.findById(req.params.id).populate('students');

        if (!testSeries) {
            return res.status(404).json({ message: "Test series not found" });
        }

        // Create a new question and save it
        const newQuestion = new MSQs(req.body);
        const savedQuestion = await newQuestion.save();

        // Add the question to the test series and save it
        testSeries.questions.push(savedQuestion._id);
        await testSeries.save();

        // Notify all enrolled students by email
        const enrolledStudents = await User.find({
            _id: { $in: testSeries.students }, // Assuming 'students' field contains the list of enrolled student IDs
        });

        // Send email notifications to all enrolled students
        const emailPromises = enrolledStudents.map(student => {
            return sendEmail({
                to: student.email,
                subject: "New Question Added to Your Test Series",
                html: `
                    <div>
                        <h1>New Question in Test Series: ${testSeries.test_series_name}</h1>
                        <p>A new question has been added to the test series you're enrolled in. Start practicing now!</p>
                    </div>
                `
            });
        });

        await Promise.all(emailPromises); // Send all emails concurrently

        // Emit Socket.IO event to notify all students enrolled in the test series
        const io = req.app.get("io"); // Retrieve the Socket.IO instance from the app
        enrolledStudents.forEach(student => {
            io.to(student._id.toString()).emit("newQuestion", {
                test_series_name: testSeries.test_series_name,
                question: savedQuestion,
                message: `A new question has been added to the test series "${testSeries.test_series_name}".`,
            });
        });

        // Respond with a success message
        res.status(201).json({
            success: true,
            message: "Question added to test series and students notified.",
        });
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

        // Enroll user in the test series
        user.test_series.push(req.params.id);
        await user.save();

        // Notify the user by email
        await sendEmail({
            to: user.email,
            subject: "Enrollment Confirmation",
            html: `
                <div>
                    <h1>Enrolled in Test Series: ${testSeries.test_series_name}</h1>
                    <p>You have successfully enrolled in the test series: ${testSeries.test_series_name}. Start practicing now!</p>
                </div>
            `
        });

        // Emit a Socket.IO event to the user who just enrolled
        const io = req.app.get("io"); // Retrieve the Socket.IO instance from the app
        io.to(user._id.toString()).emit("enrollmentSuccess", {
            test_series_name: testSeries.test_series_name,
            message: `You have successfully enrolled in the test series: ${testSeries.test_series_name}.`,
        });

        // Respond with a success message
        res.status(200).json({ success: true, message: "Enrolled in test series and notified the user" });

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

        // Remove the user from the test series
        user.test_series = user.test_series.filter(ts => ts.toString() !== req.params.id);
        await user.save();

        // Notify the user by email
        await sendEmail({
            to: user.email,
            subject: "Unenrollment Confirmation",
            html: `
                <div>
                    <h1>Unenrolled from Test Series: ${testSeries.test_series_name}</h1>
                    <p>You have successfully unenrolled from the test series: ${testSeries.test_series_name}.</p>
                </div>
            `
        });

        // Emit a Socket.IO event to the user who just unenrolled
        const io = req.app.get("io"); // Retrieve the Socket.IO instance from the app
        io.to(user._id.toString()).emit("unenrollmentSuccess", {
            test_series_name: testSeries.test_series_name,
            message: `You have successfully unenrolled from the test series: ${testSeries.test_series_name}.`,
        });

        // Respond with a success message
        res.status(200).json({ success: true, message: "Unenrolled from test series and notified the user" });

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

export async function postDiscussion(req, res) {
    try {
        const { testSeriesId } = req.params; // Get the test series ID from the request parameters
        const { discussion } = req.body; // Get the discussion text from the request body

        // Find the test series by ID
        const testSeries = await TestSeries.findById(testSeriesId).populate('solvedBy.userID'); // Assuming `solvedBy` is used to track enrolled users

        if (!testSeries) {
            return res.status(404).json({ message: "Test series not found" });
        }

        // Add the new discussion to the forum
        testSeries.forums.push({
            userID: req.user.id, // Assume req.user contains the authenticated user's info
            discussion
        });

        await testSeries.save(); // Save the updated test series

        // Notify all enrolled users via email
        const enrolledUsers = testSeries.solvedBy.map(user => user.userID); // Get all enrolled users
        const uniqueUsers = [...new Set(enrolledUsers.map(user => user._id.toString()))]; // Ensure no duplicate users

        const emailPromises = uniqueUsers.map(async userId => {
            const user = await User.findById(userId);
            return sendEmail({
                to: user.email,
                subject: "New Discussion in Test Series",
                html: `
                    <div>
                        <h1>New Discussion in Test Series: ${testSeries.test_series_name}</h1>
                        <p>A new discussion has been posted in the forum:</p>
                        <p>${discussion}</p>
                        <p>Posted by: ${req.user.fName} ${req.user.lName}</p>
                    </div>
                `
            });
        });

        await Promise.all(emailPromises); // Send all emails concurrently

        // Emit a Socket.IO event to notify all enrolled users about the new discussion
        const io = req.app.get("io"); // Retrieve the Socket.IO instance from the app
        uniqueUsers.forEach(userId => {
            io.to(userId).emit("newDiscussion", {
                test_series_name: testSeries.test_series_name,
                discussion,
                message: `A new discussion has been posted in the test series "${testSeries.test_series_name}".`,
            });
        });

        // Respond with a success message
        res.status(201).json({
            success: true,
            message: "Discussion added and all enrolled users notified.",
            forum: testSeries.forums
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function getDiscussionsByTestSeriesId(req, res) {
    try {
        const testSeries = await TestSeries.findById(req.params.testSeriesId).populate('forums.userID');

        if (!testSeries) {
            return res.status(404).json({ message: "Test series not found" });
        }

        res.status(200).json({ success: true, forum: testSeries.forums });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}



export async function addRatingToTestSeries(req, res) {
    try {
        const { testSeriesId } = req.params; // Get the test series ID from the request parameters
        const { rating, review } = req.body; // Get the rating and review from the request body

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5." });
        }

        // Find the test series by ID
        const testSeries = await TestSeries.findById(testSeriesId);

        if (!testSeries) {
            return res.status(404).json({ message: "Test series not found" });
        }

        const userID = req.user.id; // Assume req.user contains the authenticated user's info

        // Check if the user has already rated the test series
        const existingRating = testSeries.ratings.find(r => r.userID.toString() === userID.toString());

        if (existingRating) {
            // Update the existing rating
            existingRating.rating = rating;
            existingRating.review = review || existingRating.review;
        } else {
            // Add new rating and review
            testSeries.ratings.push({
                userID,
                rating,
                review
            });
        }

        await testSeries.save(); // Save the updated test series with the new/updated rating

        res.status(200).json({
            success: true,
            message: "Rating added/updated successfully",
            ratings: testSeries.ratings
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}


