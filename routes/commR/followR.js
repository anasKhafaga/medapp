const express = require('express');
const router = express.Router();
const otherProfileC = require('../../controller/commC/otherProfileC');
const auth = require('../../auth/authT');

router
  // these routes are preceded by /community/follow
  .post('/:username', auth, otherProfileC.follow);

module.exports = router;
