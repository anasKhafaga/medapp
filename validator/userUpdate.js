const { checkSchema } = require('express-validator');
const { User } = require('../models/User');

exports.checkUser = checkSchema({
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
            // remember to change req.body.userId >> req.userId
            if (user) {
              if (user._id != req.body.userId) {
                reject('Username already in use');
              }
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
            // remember to change req.body.userId >> req.userId
            if (user) {
              if (user._id != req.body.userId) {
                reject('E-mail already in use');
              }  
            }
            resolve();
          });
        });
      }
    }
  },
  firstname: {
    in: 'body',
    trim: true,
    custom: {
      options: (value, { req }) => {
        let name = value.toString();
        if (name.length < 1 || name.length > 10) {
          throw new Error(
            'First name must be lesser than 10 chars'
          );
        }
        const fChar = name.split('')[0];
        const rChar = name.substr(1);
        name = fChar.toUpperCase() + rChar;
        req.body.firstname = name;
        return true;
      }
    }
  },
  lastname: {
    in: 'body',
    trim: true,
    custom: {
      options: (value, { req }) => {
        if (!value) {
          return true
        }
        let name = value.toString();
        if (name.length > 10) {
          throw new Error(
            'Last name must be lesser than 10 chars'
          );
        }
        const fChar = name.split('')[0];
        const rChar = name.substr(1);
        name = fChar.toUpperCase() + rChar;
        req.body.lastname = name;
        return true;
      }
    }
  },
  certifications: {
    in: 'body',
    trim: true,
    custom: {
      options: (value, { req }) => {
        if (!value) {
          return true;
        }
        const arr = value.toString().split(' ');
        req.body.certifications = arr;
        return true;
      }
    }
  },
  education: {
    in: 'body',
    trim: true,
    custom: {
      options: (value, { req }) => {
        if (!value) {
          return true;
        }
        const arr = value.toString().split(' ');
        req.body.certifications = arr;
        return true;
      }
    }
  },
  workHistory: {
    in: 'body',
    trim: true,
    custom: {
      options: (value, { req }) => {
        if (!value) {
          return true;
        }
        const arr = value.toString().split(' ');
        req.body.certifications = arr;
        return true;
      }
    }
  },
  skills: {
    in: 'body',
    trim: true,
    custom: {
      options: (value, { req }) => {
        if (!value) {
          return true;
        }
        const arr = value.toString().split(' ');
        req.body.certifications = arr;
        return true;
      }
    }
  },
  bio: {
    in: 'body',
    trim: true,
    custom: {
      options: (value, { req }) => {
        if (!value) {
          return true;
        }
        console.log(value)
        const val = value.toString();
        req.body.bio = val
        return true
      }
    }
  }
});

module.exports.checkPassword = checkSchema({
  oldPassword: {
    in: 'body',
    trim: true,
    custom: {
      options: (value) => {
        if (!value) {
          return 'Please, enter the old password'
        }
        const pass = value.toString();
        return new Promise((resolve, reject) => {
          User.findById(req.userId, (err, user) => {
            if (err) {
              reject('Oops! something went wrong, please try again later.')
            }
            if (!user) {
              reject('Pleaes, log in!')
            }
            if (user.password != pass) {
              reject('Your password is incorrect');
            }
            resolve();
          })
        })
      }
    }
  },
  newPassword: {
    custom: {
      options: (value) => {
        if (!value) {
          return 'Please enter the new password';
        }
        req.newPassword = value.toString();
        return true;
      }
    }
  },
  passwordConfirm: {
    custom: {
      options: (value, { req }) => {
        if (!value) {
          return 'Please enter the password confirmation';
        }
        if (value != req.body.newPassword) {
          return 'Passwords don\'t match'
        }
        return true
      }
    }
  }
})
