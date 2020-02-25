const { User } = require('../../models/User');
const Follower = require('../../models/follow/Follower');
const Following = require('../../models/follow/Following');


module.exports.follow = async (req, res, next) => {
  let followingId;
  const error = new Error('Oops! something went wrong');
  await User.findOne({ username: req.params.username })
    .populate('followers')
    .exec()
    .then(user => {
      if (!user) {
        return res.json({
          error: "This user doesn't exist"
        });
      }
      followingId = user._id;

      if (user.followers) {
        Follower.findOne(
          { userId: user._id, followerId: req.userId },
          (err, follower) => {
            if (err) {
              return next(error);
            }
            if (!follower) {
              Follower.create({
                userId: user._id,
                followerId: req.userId
              }).catch(err => next(error));
            } else {
              Follower.deleteOne(
                { userId: user._id, followerId: req.userId },
                err => {
                  if (err) {
                    return next(error);
                  }
                }
              );
            }
          }
        );
      } else {
        Follower.create({
          userId: user._id,
          followerId: req.userId
        });
      }
    })
    .catch(err => {
      const errr = new Error('Oops! something went wrong.');
      return next(errr);
    });
  User.findOne({ _id: req.userId })
    .populate('followings')
    .exec()
    .then(user => {
      if (!user) {
        return res.json({
          error: 'Please, log in!'
        });
      }
      if (user.followings) {
        Following.findOne(
          { userId: user._id, followingId: followingId },
          (err, following) => {
            if (err) {
              return next(error);
            }
            if (!following) {
              Following.create({
                userId: user._id,
                followingId: followingId
              })
                .then(() => {
                  return res.json({
                    cong: 'congrats'
                  });
                })
                .catch(err => next(error));
            } else {
              Following.deleteOne(
                {
                  userId: user._id,
                  followingId: followingId
                },
                err => {
                  if (err) {
                    return next(error);
                  }
                  res.json({
                    del: 'delete'
                  });
                }
              );
            }
          }
        );
      } else {
        Following.create({
          userId: user._id,
          followingId: followingId
        }).then(() => {
          return res.json({
            cong: 'congrats'
          });
        });
      }
    })
    .catch(err => {
      const errr = new Error('Oops! something went wrong.');
      return next(errr);
    });
};
