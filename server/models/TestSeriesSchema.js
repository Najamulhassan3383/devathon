import mongoose from "mongoose";

const { Schema, model } = mongoose;

const testSeriesSchema = new Schema(
  {
    teachersID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    test_series_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "MSQs",
      },
    ],
    isPaid: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    forums: [
      {
        userID: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        discussion: {
          type: String,
        },
      },
    ],
    joinedBy: [
      {
        userID: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    solvedBy: [
      {
        userID: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        solvedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    joinedBy: [{
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    ratings: [
      {
        userID: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
        },
        review: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export default model("TestSeries", testSeriesSchema);
