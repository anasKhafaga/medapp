const mongoose = require('mongoose');
const lodash = require('lodash');
const passportLocalMongoose = require('passport-local-mongoose');
const path = require('path');


const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  profilePic: {
    type: String,
    default: path.join(process.cwd(), 'public', 'images', 'user', 'pic.png')
  },
  certifications: {
    type: Array
  },
  education: {
    type: Array
  },
  workHistory: {
    type: Array
  },
  skills: {
    type: Array
  },
  bio: {
    type: String,
  }
});

User.virtual('fullName').get(function () {
  if (this.lastName) {
    return (
      lodash.capitalize(this.firstName) +
      ' ' +
      lodash.capitalize(this.lastName)
    );
  }
  return lodash.capitalize(this.firstName);
});

User.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author'
});

User.virtual('postCount').get(function() {
  if (this.posts) {
    return this.posts.length;
  }
});

User.virtual('casePosts', {
  ref: 'CasePost',
  localField: '_id',
  foreignField: 'author'
});

User.virtual('casePostCount').get(function() {
  if (this.casePosts) {
    return this.casePosts.length;
  }
});

User.virtual('followers', {
  ref: 'Follower',
  localField: '_id',
  foreignField: 'userId',
});

User.virtual('followerCount').get(function() {
  if (this.followers) {
    return this.followers.length;
  }
});

User.virtual('followings', {
  ref: 'Following',
  localField: '_id',
  foreignField: 'userId'
})

User.virtual('followingCount').get(function() {
  if (this.followings) {
    return this.followings.length;
  }
});

User.plugin(passportLocalMongoose);

module.exports.User = mongoose.model('User', User);
