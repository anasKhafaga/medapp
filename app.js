// require modules
const createError = require('http-errors');
const express = require('express');
const helm = require('helmet');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const bp = require('body-parser');
const keys = require('./keys');

// require routes
const authRouter = require('./routes/authR');
const comRouter = require('./routes/commR');

// start express app
const app = express();

// helmet middleware
app.use(helm());

// connect database
mongoose.connect(keys.dbURI, { useFindAndModify: false });

// logger
app.use(logger('dev'));

// passport middleware
app.use(passport.initialize());

// body parser
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

// serve puplic folder
app.use(express.static(path.join(__dirname, 'public')));

// handle routes
app.use('/', authRouter);
app.use('/community', comRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: 'Something went wrong'
  });
});

module.exports = app;
