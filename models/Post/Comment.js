const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

Comment.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'likedId'
});

Comment.virtual('likeCount').get(function() {
  if (this.likes) {
    return this.likes.length;
  }
});

Comment.virtual('dislikes', {
  ref: 'Dislike',
  localField: '_id',
  foreignField: 'disLikedId'
});

Comment.virtual('dislikeCount').get(function() {
  if (this.dislikes) {
    return this.dislikes.length;
  }
});

Comment.virtual('replies', {
  ref: 'Reply',
  localField: '_id',
  foreignField: 'commentId'
});

Comment.virtual('repliesCount').get(function() {
  if (this.replies) {
    return this.replies.length;
  }
});

module.exports = mongoose.model('Comment', Comment);
