const express = require('express');
const router = express.Router();
const newsFeed = require('./commR/newsFeedR');
const profile = require('./commR/profileR');
const follow = require('./commR/followR');
const auth = require('../auth/authT');

router
  // these routes are preceded by /community.....
  .use('/newsFeed', auth, newsFeed)
  .use('/profile', auth, profile)
  .use('/follow', auth, follow);

module.exports = router;
