const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
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
});

const Scores = mongoose.model('Scores', scoreSchema);

module.exports = Scores;
