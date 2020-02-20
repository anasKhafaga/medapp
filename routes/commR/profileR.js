const express = require('express');
const router = express.Router();
const profileC = require('../../controller/commC/profileC');
const multerConfig = require('../../config/multer');
const { checkUser, checkPassword } = require('../../validator/userUpdate');

router.put('/updateUser', multerConfig.uploadUserPic, checkUser, profileC.updateUser);

router.put('/updateUserPassword', checkPassword, profileC.updateUserPassword);

module.exports = router;
