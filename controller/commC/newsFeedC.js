const Post = require('../../models/Post/Post')
const Tag = require('../../models/Post/Tag');
const { validationResult } = require('express-validator')

module.exports.createPost = async(req, res, next) => {
  const post = req.body;
  let refs = null;
  let tags = null;
  let media = null;
  let state = true;
  let error;
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    throw new Error(validation.errors[0].msg);
  }
  if (post.refrence) {
    refs = post.refrence.split(' ')
  }
  if (post.tags) {
    tags = post.tags.split(' ') 
    await Tag.find({})
      .then((dbTags) => {
        tags.map(tag => {
        const tagname = dbTags.map(dbtag => {
          return dbtag.name;
        });
        if (tagname.indexOf(tag) < 0) {
          error = new Error('Please, choose one of the given tags');
          state = false;
        }
      })
      })
      .catch(err=> next(err))
  }  
  if (req.files) {
    media = req.files.map(file => {
      return file.path;
    })
  }
  if (state) {
    Post.create({
      category: post.category,
      title: post.title,
      content: post.content,
      media: media,
      tags: tags,
      privacy: post.privacy,
      author: req.userId,
      refrence: refs
    })
      .then(cPost => {
      res.json({
        post: cPost,
      })
      })
      .catch(err => {
      next(err)
    })
  } else {
    res.status(400);
    next(error)
  }
}