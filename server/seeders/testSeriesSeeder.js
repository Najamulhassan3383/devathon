import mongoose from 'mongoose';
import TestSeries from '../models/TestSeriesSchema.js';
import MSQs from '../models/MSQsSchema.js';
import SolvedQuestion from '../models/SolvedQuestionSchema.js';
import User from '../models/UserSchema.js'; // Assuming you have a User model

const teacherId = '66dbe1b2236f741c189b9cfb';
const teacherEmail = 'sp21-bcs-065@cuilahore.edu.pk';

const subjects = ['math', 'physics', 'chemistry', 'bio'];

const generateRandomMSQs = async (count) => {
  const msqs = [];
  for (let i = 0; i < count; i++) {
    const msq = new MSQs({
      question: `Sample question ${i + 1}`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct_answers: 'A',
      subject: subjects[Math.floor(Math.random() * subjects.length)]
    });
    await msq.save();
    msqs.push(msq._id);
  }
  return msqs;
};

const seedTestSeries = async () => {
  try {
    // Ensure the teacher exists in the User collection
    let teacher = await User.findById(teacherId);
    if (!teacher) {
      teacher = new User({
        _id: teacherId,
        email: teacherEmail,
        // Add other required fields for the User model
      });
      await teacher.save();
    }

    // Create 4 test series
    for (let i = 0; i < 4; i++) {
      const questions = await generateRandomMSQs(10);
      const testSeries = new TestSeries({
        teachersID: teacherId,
        test_series_name: `Test Series ${i + 1}`,
        description: `Description for Test Series ${i + 1}`,
        questions: questions,
        isPaid: i % 2 === 0, // Alternating between paid and free
        price: i % 2 === 0 ? 9.99 : 0,
        forums: [
          {
            userID: teacherId,
            discussion: 'Welcome to this test series!'
          }
        ],
        solvedBy: []
      });

      await testSeries.save();

      // Create some solved questions for demonstration
      const sampleStudentId = new mongoose.Types.ObjectId();
      for (let j = 0; j < 5; j++) {
        const solvedQuestion = new SolvedQuestion({
          userID: sampleStudentId,
          questionID: questions[j],
          testSeriesID: testSeries._id,
          correct: Math.random() < 0.7 // 70% chance of being correct
        });
        await solvedQuestion.save();

        // Update the solvedBy array in the TestSeries
        await TestSeries.findByIdAndUpdate(testSeries._id, {
          $push: {
            solvedBy: {
              userID: sampleStudentId,
              solvedAt: solvedQuestion.solvedAt
            }
          }
        });
      }
    }

    console.log('Test series seeding completed successfully');
  } catch (error) {
    console.error('Error seeding test series:', error);
  } finally {
    mongoose.disconnect();
  }
};

// Connect to MongoDB and run the seeder
mongoose
  .connect("mongodb+srv://dev:dev@cluster0.hsjgm.mongodb.net/devathon")
  .then(() => {
    console.log("Connected to MongoDB");
    seedTestSeries();
  })
  .catch((err) => console.error("MongoDB connection error:", err));