const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Operation = new Schema({
  objectId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  complications: {
    type: Array
  },
  notes: {
    type: String
  }
});

module.exports = mongoose('Operation', Operation);
