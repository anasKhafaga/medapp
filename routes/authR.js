const express = require('express');
const router = express.Router();
const controller = require('../controller/authC');
const { checkSignup } = require('../validator/authValidation');
const passport = require('passport');

router

  /* GET login listing. */
  .get('/login', controller.getLogin)

  /* POST login listing. */
  .post('/login', controller.postLogin)

  /* GET signup listing. */
  .get('/signup', controller.getSignup)

  /* POST signup listing. */
  .post('/signup', checkSignup, controller.postSignup)

  /* GET facebook listing. */
  .get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ['username', 'id', 'name'] })
  )

  .get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login',
      successRedirect: '/'
    })
  )

  /* GET google listing. */
  .get(
    '/auth/google',
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/userinfo.profile'
      ]
    })
  )
  .get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login'
    }),
    controller.googleCallback
  );

module.exports = router;
