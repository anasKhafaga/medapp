const express = require('express');
const router = express.Router();
const newsFeed = require('./commR/newsFeedR');
const profile = require('./commR/profileR')
const otherProfile = require('./commR/otherProfileR');

router.use('/newsFeed', newsFeed)

router.use('/profile', profile)

router.use('/follow', otherProfile)

module.exports = router;