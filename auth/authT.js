const jwt = require('jsonwebtoken');
const {secret} = require('../keys')

module.exports = (req, res, next) => {
  const preToken = req.headers.authorization;
  console.log(preToken)
  if (!preToken) {
    const err = new Error('Oops! login now to get full access');
    res.status(401);
    return next(err);
  }
  const token = preToken.split(' ')[1];
  console.log(token);
  try {
    jwt.verify(token, secret);
    req.userId = jwt.decode(token)._id
  } catch(err) {
    console.log(err.name)
    if (err.name === 'TokenExpiredError') {
      const error = new Error('Please, login');
      res.statusCode = 401;
      return next(error);
    } else {
      const error = new Error('Oops! something went wrong.')
      res.statusCode = 400;
      return next(error);
    }
  }
  next()
}
