const express = require('express');
const Scores = require('../models/studentScores');
const adminAuth = require('../middleware/adminAuth');
const studentAuth = require('../middleware/auth');

const router = new express.Router();

//this end point is used to create a student score document and it is used to icrement the score of each subject
router.post('/scores', studentAuth, async (req, res) => {
  try {
    //here i am checking to see if the current user submitting this request is his first time submitting the request
    const scoreExists = await Scores.findOne({
      userId: req.user._id,
    });

    //if the user already has score document created previously
    if (scoreExists) {
      const updates = Object.keys(req.body);
      const allowedUpdates = ['subjectName', 'score'];
      const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
      );

      if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
      }

      // increment the score
      scoreExists[req.body.subjectName] =
        scoreExists[req.body.subjectName] + req.body.score;

      scoreExists.save();
      res.status(201).send();
    } else {
      const score = new Scores({
        userId: req.user._id,
        [req.body.subjectName]: req.body.score,
      });
      await score.save();
      res.status(201).send();
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

//admin users use this endpoint to query the scores of all students
router.get('/scores', adminAuth, async (req, res) => {
  try {
    const list = await Scores.find({})
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
      userId: req.user._id,
    });

    res.send(score);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
