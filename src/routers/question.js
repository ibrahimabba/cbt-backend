const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const Question = require('../models/question');
const adminAuth = require('../middleware/adminAuth');
const studentAuth = require('../middleware/auth');
const router = new express.Router();

//admin users can create new questions
const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG)$/)) {
      return cb(new Error('Please upload an image'));
    }

    cb(undefined, true);
  },
});
router.post('/questions', upload.single('questionImage'), async (req, res) => {
  let questionImage;
  if (req.file?.buffer) {
    questionImage = req.file.buffer;
  }

  const data = {
    questionImage,
    correctAnswer: req.body.correctAnswer,
    choices: req.body.choices,
    question: req.body.question,
    subjectName: req.body.subjectName,
    year: req.body.year,
    topicName: req.body.topicName,
  };

  const question = new Question(data);

  try {
    await question.save();
    res.status(201).send(question);
  } catch (e) {
    res.status(400).send(e);
  }
});

//admin user can edit a question by id
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

//users registers as admins can delete a single question by id
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

//users registers as admins can delete all the questions
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

//any one registerd or not can get all questions, and can filter them by subject name, topic name and by year
router.get('/questions', async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.subjectName) {
    match.subjectName = req.query.subjectName;
  }

  if (req.query.topicName) {
    match.topicName = req.query.topicName;
  }
  if (req.query.year) {
    match.year = req.query.year;
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }
  //console.log(match);
  try {
    const list = await Question.find(match)
      .limit(parseInt(req.query.limit || 5))
      .skip(parseInt(req.query.skip || 0));

    res.send(list);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
