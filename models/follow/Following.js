const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Following = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  followingId: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Following', Following);