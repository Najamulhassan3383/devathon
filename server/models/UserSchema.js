import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'teacher'],
        default: 'student'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    },
    test_series: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestSeries'
    }],
    solvedTests: [{
        testSeriesID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TestSeries'
        },
        solvedAt: {
            type: Date,
            default: Date.now
        }
    }],
    solvedQuestions: [{
        questionID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MSQs'
        },
        solvedAt: {
            type: Date,
            default: Date.now
        },
        correct: {
            type: Boolean
        }
    }]
}, { timestamps: true });

export default model('User', userSchema);
