const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { OAUser, User } = require('../models/User');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { FBAppID, FBAppSecret, GAppID, GAppSecret } = require('../keys');

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (user.password !== password) {
        return done(null, false);
      }
      return done(null, true);
    });
  })
);

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

passport.use(
  new FacebookStrategy(
    {
      clientID: FBAppID,
      clientSecret: FBAppSecret,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'username', 'name']
    },
    oAuth()
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GAppID,
      clientSecret: GAppSecret,
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    oAuth()
  )
);

function oAuth() {
  return function(token, tokenSecret, profile, done) {
    console.log(token);
    console.log(profile);
    const username = profile.name.givenName + profile.name.familyName;
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        const fChar = profile.name.givenName.split('')[0];
        const rChar = profile.name.givenName.substr(1);
        const name = fChar + rChar;
        return User.create({
          username: username,
          firstName: name,
          email: null,
          password: null,
          lastName: null
        })
          .then(us => {
            return done(null, us);
          })
          .catch(err => {
            console.log(err);
            const error = new Error('Oops! something went wrong.');
            return done(error);
          });
      }
      return done(null, user);
    });
  };
}
