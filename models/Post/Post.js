const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Post = new Schema(
  {
    category: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    media: {
      type: Array
    },
    tags: {
      type: Array
    },
    privacy: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    refrence: {
      type: Array
    }
  },
  {
    timestamps: true
  }
);

Post.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'likedId'
});

Post.virtual('likeCount').get(function() {
  if (this.likes) {
    return this.likes.length
  }
});

Post.virtual('dislikes', {
  ref: 'Dislike',
  localField: '_id',
  foreignField: 'disLikedId'
});

Post.virtual('dislikeCount').get(function() {
  if (this.dislikes) {
    return this.dislikes.length;
  }
});

Post.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId'
});

Post.virtual('commentCount').get(function() {
  if (this.comments) {
    return this.comments.length;
  }
});

Post.virtual('shares', {
  ref: 'Share',
  localField: '_id',
  foreignField: 'postId'
});

Post.virtual('shareCount').get(function() {
  if (this.shares) {
    return this.shares.length;
  }
});



module.exports = mongoose.model('Post', Post);
