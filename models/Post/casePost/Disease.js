const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Disease = new Schema({
  objectId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date
  },
  type: {
    type: String
  },
  fate: {
    type: Array
  },
  notes: {
    type: String
  }
});

module.exports = mongoose('Disease', Disease)
