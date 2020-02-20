const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Examination = new Schema({
  objectId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  notes: {
    type: String
  }
});

module.exports = mongoose('Examination', Examination);
