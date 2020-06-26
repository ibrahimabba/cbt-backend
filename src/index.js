const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routers/user');
const adminRouter = require('./routers/admin');
const questionRouter = require('./routers/question');
const scoreRouter = require('./routers/studentScores');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use(userRouter);
app.use(adminRouter);
app.use(questionRouter);
app.use(scoreRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
