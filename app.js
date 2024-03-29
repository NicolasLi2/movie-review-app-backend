const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
require('dotenv').config();
require('./db');
const { errorHandler } = require('./middlewares/error');
const cors = require('cors');
const { handleNotFound } = require('./utils/helper');
const userRouter = require('./routes/user');
const actorRouter = require('./routes/actor');
const movieRouter = require('./routes/movie');
const reviewRouter = require('./routes/review');
const adminRouter = require('./routes/admin');

const app = express();
app.use(cors()); // for cross origin resource sharing
app.use(express.json()); // for parsing application/json
app.use(morgan('dev'));
app.use('/api/user', userRouter);
app.use('/api/actor', actorRouter);
app.use('/api/movie', movieRouter);
app.use('/api/review', reviewRouter);
app.use('/api/admin', adminRouter);

app.use('/*', handleNotFound);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('the port is listening on port ' + PORT);
});
