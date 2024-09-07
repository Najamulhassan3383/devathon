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

export default model('Chat', chatSchema);
