const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SharedPost = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('SharedPost', SharedPost);