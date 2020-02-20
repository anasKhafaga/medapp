const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Like = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    likedId: {
      type: Schema.Types.ObjectId,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Dislike = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    disLikedId: {
      type: Schema.Types.ObjectId,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports.Like = mongoose.model('Like', Like);
module.exports.Dislike = mongoose.model('Dislike', Dislike);
