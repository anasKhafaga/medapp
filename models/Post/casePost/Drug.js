const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Drug = new Schema({
  objectId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  dose: {
    type: Number
  },
  startDate: {
    type: Date
  },
  duration: {
    type: Number
  },
  complications: {
    type: Array
  },
  notes: {
    type: String
  }
});

module.exports = mongoose('Drug', Drug);
