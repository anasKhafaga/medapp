const express = require('express');
const router = express.Router();
const profileC = require('../../controller/commC/profileC');
const multerConfig = require('../../config/multer');
const { checkUser, checkPassword } = require('../../validator/userUpdate');
const auth = require('../../auth/authT');

router
  // these routes are preceded by /community/profile....

  /* PUT update user info listing. */
  .put(
    '/updateUser',
    auth,
    multerConfig.uploadUserPic,
    checkUser,
    profileC.updateUser
  )
  /* PUT update user password listing. */
  .put('/updateUserPassword', auth, checkPassword, profileC.updateUserPassword);

module.exports = router;
