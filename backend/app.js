const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');

const { errors } = require('celebrate');

const cors = require('cors');

const router = require('./routes');

const errorHandler = require('./middlewares/errors-handler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.set('strictQuery', true);

dotenv.config();

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(cors());

app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

async function connectDB() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
  });
  app.listen(PORT);
}
connectDB();
