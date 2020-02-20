const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Follower = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  followerId: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Follower', Follower);
