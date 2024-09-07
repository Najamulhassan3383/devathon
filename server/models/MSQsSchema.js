import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const msqsSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correct_answers: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        enum: ['math', 'physics', 'chemistry', 'bio'],
        required: true
    }
}, { timestamps: true });

export default model('MSQs', msqsSchema);
