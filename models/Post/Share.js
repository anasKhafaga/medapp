const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Share = new Schema(
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

module.exports = mongoose.model('Share', Share);
