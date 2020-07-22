const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    topic: { type: String, trim: true, lowercase: true },
    year: { type: Number },
    instruction: { type: String, trim: true, lowercase: true },
    questionImage: {
      type: Buffer,
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
          trim: false,
        },
        choices: [{ type: String, trim: true }],
        correctAnswer: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
