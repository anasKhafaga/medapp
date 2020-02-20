const express = require('express');
const router = express.Router();
const newsFeedC = require('../../controller/commC/newsFeedC');
const multerConfig = require('../../config/multer');
const { checkPost } = require('../../validator/postValidation');


router.post('/createPostImg', multerConfig.uploadImg, checkPost, newsFeedC.createPost)

router.post('/createPostVid', multerConfig.uploadVid,  checkPost, newsFeedC.createPost)

module.exports = router