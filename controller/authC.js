const { secret } = require('../keys');
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
exports.getLogin = (req, res, next) => {
  res.json({
    wait: 'wait'
  });
};

exports.postLogin = async (req, res, next) => {
  const test = req.body.test;
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.json({
      Oops: 'U wanna to hack me'
    });
  }
  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        return User.findOne({ email: username });
      }
      const pass = bcrypt.compareSync(password, user.password);
      if (!pass) {
        const error = new Error('Oops! wrong username or password');
        res.statusCode = 401;
        return next(error);
      }
      token(user, res);
      res.json({
        wait: 'wait'
      });
    })
    .then(user => {
      if (!user) {
        const error = new Error('Oops! wrong username or password');
        res.statusCode = 401;
        return next(error);
      }
      const pass = bcrypt.compareSync(password, user.password);
      if (!pass) {
        const error = new Error('Oops! wrong username or password');
        res.statusCode = 401;
        return next(error);
      }
      token(user, res);
      res.json({
        wait: 'wait'
      });
    })
    .catch(err => {
      const erorr = new Error('Oops! something went wrong');
      console.log(err);
      return next(erorr);
    });
};

exports.getSignup = (req, res, next) => {
  res.json({
    wait: 'wait'
  });
};

exports.postSignup = (req, res, next) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    throw new Error(validation.errors[0].msg);
  }
  const password = bcrypt.hashSync(req.body.password, 12);
  let lastName = null;
  if (req.body.lastname) {
    lastName = req.body.lastname.toString();
  }
  User.create({
    username: req.body.username,
    email: req.body.email,
    password,
    firstName: req.body.firstname,
    lastName
  })
    .then(user => {
      token(user, res);
      res.json({
        wait: 'wait'
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.googleCallback = (req, res, next) => {
  payLoad = {
    firstName: req.user.firstName,
    _id: req.user._id
  };
  const token = jwt.sign(payLoad, secret, {
    expiresIn: '7d',
    algorithm: 'HS256'
  });
  res.setHeader('Authorization', token);
  res.json({
    wait: 'Wait',
    token: token
  });
};

function token(user, res) {
  const token = jwt.sign({ _id: user._id, name: user.firstName }, secret, {
    expiresIn: '7d',
    algorithm: 'HS256'
  });
  res.setHeader('Authorization', token);
}
