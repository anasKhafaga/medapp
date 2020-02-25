const express = require('express');
const router = express.Router();
const newsFeedC = require('../../controller/commC/newsFeedC');
const multerConfig = require('../../config/multer');
const { checkPost } = require('../../validator/postValidation');
const auth = require('../../auth/authT');

router
  // these routes are preceded by /community/newsFeed....

  /* POST create post with image listing. */
  .post(
    '/createPostImg',
    auth,
    multerConfig.uploadImg,
    checkPost,
    newsFeedC.createPost
  )

  /* POST create post with video listing. */
  .post(
    '/createPostVid',
    auth,
    multerConfig.uploadVid,
    checkPost,
    newsFeedC.createPost
  );

module.exports = router;
