const { User } = require('../../models/User');
const { validationResult } = require('express-validator');

module.exports.updateUser = async (req, res, next) => {
  const user = req.body;
  let userPic = req.file;
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    throw new Error(validation.errors[0].msg);
  }
  if (!userPic) {
    await User.findOne({ _id: req.userId }, (err, foundUser) => {
      userPic = foundUser.profilePic;
    });
  } else {
    userPic = req.file.path;
  }

  User.findOneAndUpdate(
    { _id: req.userId },
    {
      $set: {
        username: user.username,
        email: user.email,
        firstName: user.firstname,
        lastName: user.lastname,
        profilePic: userPic,
        certifications: user.certifications,
        education: user.education,
        workHistory: user.workHistory,
        skills: user.skills,
        bio: user.bio
      }
    },
    (err, user) => {
      if (err) {
        const error = new Error('Oops! something went wrong.');
        return next(error);
      }
      res.status(201).json({
        success: 'Your profile has been updated successfully.'
      });
    }
  );
};

module.exports.updateUserPassword = async (req, res, next) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    throw new Error(validation.errors[0].msg);
  }
  await User.findOneAndUpdate(
    { _id: req.userId },
    {
      password: req.newPassword
    },
    (err, user) => {
      if (err) {
        const error = new Error('Oops! something went wrong.');
        return next(error);
      }
      res.status(201).json({
        success: 'Your password has been updated successfully.'
      });
    }
  );
};