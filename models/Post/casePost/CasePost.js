const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CasePost = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    occupation: {
      type: String
    },
    maritalStatus: {
      type: String
    },
    socioeconomicStatus: {
      type: String
    },
    children: {
      type: Number
    },
    habits: {
      type: Array
    },
    familyHistory: {
      type: Array
    },
    aim: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

CasePost.virtual('drugs', {
  ref: 'Drug',
  localField: '_id',
  foreignField: 'objectId'
});

CasePost.virtual('operations', {
  ref: 'Operation',
  localField: '_id',
  foreignField: 'objectId'
});

CasePost.virtual('diseases', {
  ref: 'Disease',
  localField: '_id',
  foreignField: 'objectId'
});

CasePost.virtual('examinations', {
  ref: 'Examination',
  localField: '_id',
  foreignField: 'objectId'
});

CasePost.virtual('investigations', {
  ref: 'Investigation',
  localField: '_id',
  foreignField: 'objectId'
});


module.exports = mongoose.model('CasePost', CasePost);
