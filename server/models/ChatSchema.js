import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const chatSchema = new Schema({
    chatID: {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    teacherID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chat: [{
        senderID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        message: {
            type: String,
            required: true
        },
        time: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true });

// Ensure that the combination of userID and teacherID is unique
chatSchema.index({ userID: 1, teacherID: 1 }, { unique: true });

export default model('Chat', chatSchema);
