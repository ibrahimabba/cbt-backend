const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      trim: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    choices: [String],
    correctAnswer: { type: String, required: true, trim: true },
    year: { type: Number },
    topicName: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
