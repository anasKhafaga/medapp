const { checkSchema } = require('express-validator');
const lodash = require('lodash');

module.exports.checkPost = checkSchema({
  category: {
    in: 'body',
    trim: true,
    isLength: {
      options: {
        min: 1
      },
      errorMessage: 'Please choose a category'
    }
  },
  title: {
    in: 'body',
    trim: true,
    custom: {
      options: (value, { req }) => {
        if (value.length > 100 || value.length < 5) {
          throw new Error(
            'title must be greater than 5 chars and lesser than 100 chars'
          );
        }
        const title = lodash.capitalize(value);
        req.body.title = title;
        return true;
      }
    }
  },
  content: {
    in: 'body',
    trim: true,
    isLength: {
      options: {
        min: 1
      },
      errorMessage: 'Please, enter content'
    }
  },
  privacy: {
    in: 'body',
    trim: true,
    custom: {
      options: (value, { req }) => {
        console.log(value);
        if (value !== 'Public' || value !== 'Friends') {
          value = 'Public';
        }
        req.body.privacy = value;
        return true;
      }
    }
  }
});
