const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CaseComment = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    casePostId: {
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

CaseComment.virtual('drugs', {
  ref: 'Drug',
  localField: '_id',
  foreignField: 'objectId'
});

CaseComment.virtual('operations', {
  ref: 'Operation',
  localField: '_id',
  foreignField: 'objectId'
});

CaseComment.virtual('diseases', {
  ref: 'Disease',
  localField: '_id',
  foreignField: 'objectId'
});

CaseComment.virtual('examinations', {
  ref: 'Examination',
  localField: '_id',
  foreignField: 'objectId'
});

CaseComment.virtual('investigations', {
  ref: 'Investigation',
  localField: '_id',
  foreignField: 'objectId'
});

CaseComment.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'likedId'
});

CaseComment.virtual('likeCount').get(function() {
  if (this.likes) {
    return this.likes.length;
  }
});

CaseComment.virtual('dislikes', {
  ref: 'Dislike',
  localField: '_id',
  foreignField: 'disLikedId'
});

CaseComment.virtual('dislikeCount').get(function() {
  if (this.dislikes) {
    return this.dislikes.length;
  }
});

CaseComment.virtual('replies', {
  ref: 'Reply',
  localField: '_id',
  foreignField: 'commentId'
});

CaseComment.virtual('repliesCount').get(function() {
  if (this.replies) {
    return this.replies.length;
  }
});

module.exports = mongoose.model('CaseComment', CaseComment);
