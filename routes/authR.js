const express = require('express');
const router = express.Router();
const auth = require('../auth/authT');
const controller = require('../controller/authC');
const { checkSignup } = require('../validator/authValidation');
const passport = require('passport');
const authPass = require('../auth/auth');

/* GET users listing. */
router.get('/login', controller.getLogin);

router.post('/login', controller.postLogin);

router.get('/signup', controller.getSignup);

router.post('/signup', checkSignup, controller.postSignup);


router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['username', 'id', 'name'] })
);
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/userinfo.profile'
    ]
  })
);

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: '/'
  })
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  controller.googleCallback
);

module.exports = router;
