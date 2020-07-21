const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    Mathematics: {
      type: Number,
      default: 0,
    },
    Physics: {
      type: Number,
      default: 0,
    },
    Chemistry: {
      type: Number,
      default: 0,
    },
    Biology: {
      type: Number,
      default: 0,
    },
    Government: {
      type: Number,
      default: 0,
    },
    totalScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Scores = mongoose.model('Scores', scoreSchema);

module.exports = Scores;
