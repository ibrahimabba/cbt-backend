const express = require('express');
const Question = require('../models/question');
const adminAuth = require('../middleware/adminAuth');
const studentAuth = require('../middleware/auth');
const router = new express.Router();

router.post('/questions', adminAuth, async (req, res) => {
  const question = new Question(req.body);

  try {
    await question.save();
    res.status(201).send(question);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch('/questions/:id', adminAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'subjectName',
    'question',
    'choices',
    'correctAnswer',
    'year',
    'topicName',
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const question = await Question.findOne({
      _id: req.params.id,
    });

    if (!question) {
      return res.status(404).send();
    }

    updates.forEach((update) => (question[update] = req.body[update]));
    await question.save();
    res.send(question);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.delete('/questions/delete/:id', adminAuth, async (req, res) => {
  try {
    const question = await Question.findOneAndDelete({ _id: req.params.id });

    if (!question) {
      res.status(404).send();
    }

    res.send(question);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete('/questions/deleteAll', adminAuth, async (req, res) => {
  try {
    const question = await Question.deleteMany({});

    if (!question) {
      res.status(404).send();
    }

    res.send(question);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/questions', studentAuth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.subjectName) {
    match.subjectName = req.query.subjectName;
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }
  console.log(match);
  try {
    const list = await Question.find({ subjectName: match.subjectName })
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip));

    res.send(list);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
