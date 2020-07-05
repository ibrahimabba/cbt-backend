const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    choices: [{ type: String, trim: true }],
    correctAnswer: {
      type: String,
      required: true,
      trim: true,
    },
    year: { type: Number },
    topicName: { type: String, trim: true, lowercase: true },
    questionImage: {
      type: Buffer,
    },
  },

  {
    timestamps: true,
  }
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
