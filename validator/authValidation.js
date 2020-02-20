const { checkSchema } = require('express-validator');
const { User } = require('../models/User');

exports.checkSignup = checkSchema({
  username: {
    in: 'body',
    trim: true,
    custom: {
      options: (usrname, { req }) => {
        const value = usrname.toString().toLowerCase();
        console.log(value);
        if (value.length < 4 || value.length > 10) {
          throw new Error(
            'Username must be greater than 4 chars and lesser than 10 chars'
          );
        }
        req.body.username = value;
        return new Promise((resolve, reject) => {
          User.findOne({ username: value }, (err, user) => {
            if (err) {
              reject('Validation failed');
            }
            if (user) {
              reject('Username already in use');
            }
            resolve();
          });
        });
      }
    }
  },
  email: {
    isEmail: true,
    trim: true,
    errorMessage: 'Please, enter a valid E-mail',
    custom: {
      options: (email, { req }) => {
        const value = email.toString().toLowerCase();
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(value)) {
          throw new Error('Please, enter a valid E-mail');
        }
        req.body.email = value;
        return new Promise((resolve, reject) => {
          User.findOne({ email: value }, (err, user) => {
            if (err) {
              reject('Validation failed');
            }
            if (user) {
              reject('E-mail already in use');
            }
            resolve();
          });
        });
      }
    }
  },
  password: {
    in: 'body',
    trim: true,
    isLength: {
      errorMessage:
        'Password should be greater than 6 chars and lesser than 18 chars',
      options: {
        min: 6,
        max: 18
      }
    },
    custom: {
      options: (value, { req }) => {
        req.body.password = value.toString();
        return true;
      }
    }
  },
  confirmPassword: {
    in: 'body',
    trim: true,
    custom: {
      options: (pass, { req }) => {
        if (pass !== req.body.password) {
          throw new Error("Passwords don't match");
        }
        return true;
      }
    }
  },
  firstname: {
    in: 'body',
    trim: true,
    custom: {
      options: (value, { req }) => {
        if (!value) {
          throw new Error('Please, enter the Firstname');
        }
        let name = value.toString();
        if (name.length > 10) {
          throw new Error('First name must be lesser than 10 chars');
        }
        const fChar = name.split('')[0];
        const rChar = name.substr(1);
        name = fChar.toUpperCase() + rChar;
        req.body.firstname = name;
        return true;
      }
    }
  }
});
