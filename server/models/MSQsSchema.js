import mongoose from "mongoose";

const { Schema, model } = mongoose;

const msqsSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    correct_answers: {
      type: String,
      required: true,
      set: v => v.trim().toLowerCase(), // Normalize the correct answer
    },
    subject: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MSQs = model("MSQs", msqsSchema);

export default MSQs;
