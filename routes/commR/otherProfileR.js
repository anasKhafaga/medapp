const express = require('express');
const router = express.Router();
const otherProfileC = require('../../controller/commC/otherProfileC');

router.post('/:username', otherProfileC.follow)

module.exports = router;
