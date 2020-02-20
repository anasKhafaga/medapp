const multer = require('multer');
const path = require('path');
const uuid = require('uuid/v4');

/**
 * Post media upload
 */

const fileStoreImg = multer.diskStorage({
  destination: path.join(__dirname,'..', 'public', 'images', 'post'),
  filename: (req, file, cb) => {
    cb(null, `${uuid()}-${file.originalname}`);
  }
});

const fileStoreVid = multer.diskStorage({
  destination: path.join(process.cwd(), 'public', 'videos'),
  filename: (req, file, cb) => {
    cb(null, `${uuid()}-${file.originalname}`);
  }
});

const fileFilterImg = (req, file, cb) => {
  const type = file.mimetype;
  if (
    type === 'image/png' ||
    type === 'image/jpg' ||
    type === 'image/jpeg' ||
    type === 'image/gif'
  ) {
    return cb(null, true);
  }
  const error = new Error(
    'Sorry, the image format must be jpg / png / jpeg / gif'
  );
  return cb(error, false);
};

const fileFilterVid = (req, file, cb) => {
  const type = file.mimetype;
  if (type === 'video/mp4' || type === 'video/flv' || type === 'video/wmv') {
    return cb(null, true);
  }
  const error = new Error('Sorry, the video format must be mp4 / flv / wmv');
  return cb(error, false);
};

const limitsImg = {
  fileSize: 2097152,
  files: 10
};

const limitsVid = {
  fileSize: 10485760,
  files: 1
};

const uploadImgFun = multer({
  storage: fileStoreImg,
  fileFilter: fileFilterImg,
  limits: limitsImg
}).array('images', 10);
const uploadVidFun = multer({
  storage: fileStoreVid,
  fileFilter: fileFilterVid,
  limits: limitsVid
}).array('video');

module.exports.uploadImg = (req, res, next) => {
  uploadImgFun(req, res, err => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({
        error: err.message
      });
    } else if (err) {
      console.log(err)
      const error = new Error('Oops! something went wrong.');
      next(error);
    } else {
      next();
    }
  });
};

module.exports.uploadVid = (req, res, next) => {
  uploadVidFun(req, res, err => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({
        error: err.message
      });
    } else if (err) {
      const error = new Error('Oops! something went wrong.');
      next(error);
    } else {
      next();
    }
  });
};

/**
 * User profilePic upload
 */

const fileStoreUserPic = multer.diskStorage({
  destination: path.join(__dirname, '..', 'public', 'images', 'user'),
  filename: (req, file, cb) => {
    cb(null, `${uuid()}-${file.originalname}`);
  }
});

const fileFilterUserPic = (req, file, cb) => {
  const type = file.mimetype;
  if (
    type === 'image/png' ||
    type === 'image/jpg' ||
    type === 'image/jpeg' ||
    type === 'image/gif'
  ) {
    return cb(null, true);
  }
  const error = new Error(
    'Sorry, the image format must be jpg / png / jpeg / gif'
  );
  return cb(error, false);
};

const limitUserPic = {
  fileSize: 3145728,
  files: 1
};

const uploadUserPicFun = multer({
  storage: fileStoreUserPic,
  fileFilter: fileFilterUserPic,
  limits: limitUserPic
}).single('image');

module.exports.uploadUserPic = (req, res, next) => {
  uploadUserPicFun(req, res, err => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({
        error: err.message
      });
    } else if (err) {
      console.log(err);
      const error = new Error('Oops! something went wrong.');
      next(error);
    } else {
      next();
    }
  });
};