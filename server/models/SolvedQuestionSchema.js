import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const solvedQuestionSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questionID: {
        type: Schema.Types.ObjectId,
        ref: 'MSQs',
        required: true
    },
    testSeriesID: {
        type: Schema.Types.ObjectId,
        ref: 'TestSeries',
        required: true
    },
    solvedAt: {
        type: Date,
        default: Date.now
    },
    correct: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

export default model('SolvedQuestion', solvedQuestionSchema);
