const express = require('express');
const Scores = require('../models/studentScores');
const adminAuth = require('../middleware/adminAuth');
const studentAuth = require('../middleware/auth');

const router = new express.Router();

//this end point is used to creat a student score document and it is used to icrement the score of each subject
router.post('/scores', studentAuth, async (req, res) => {
  try {
    //here i am checking to see if the current user submitting this request is his first time submitting the request
    const scoreExists = await Scores.findOne({
      registrationNumber: req.user.registrationNumber,
    });

    //if the current user has once sumbitted
    if (scoreExists) {
      const updates = Object.keys(req.body);
      const allowedUpdates = ['subjectName', 'score'];
      const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
      );

      if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
      }

      scoreExists[req.body.subjectName] =
        scoreExists[req.body.subjectName] + req.body.score;

      scoreExists.save();
      res.status(201).send();
    } else {
      //else if the current user has never sumbitted anythings
      const score = new Scores({
        name: req.user.name,
        registrationNumber: req.user.registrationNumber,
        [req.body.subjectName]: req.body.score,

        totalScore: 100,
      });
      await score.save();
      res.status(201).send();
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

//admin users use this endpoint to query the scores of all students, it can be filtered by name and registration number
router.get('/scores', adminAuth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.registrationNumber) {
    match.registrationNumber = req.query.registrationNumber;
  }

  if (req.query.name) {
    match.name = req.query.name;
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    const list = await Scores.find(match)
      .limit(parseInt(req.query.limit || 10))
      .skip(parseInt(req.query.skip || 0));

    res.send(list);
  } catch (e) {
    res.status(500).send();
  }
});

//this endpoint is used by student to query his/her score
router.get('/scores/myscore', studentAuth, async (req, res) => {
  try {
    const score = await Scores.findOne({
      registrationNumber: req.user.registrationNumber,
    });

    res.send(score);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
