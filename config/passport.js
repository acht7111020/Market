var passport = require('passport');
var User = require('../models/user-schema');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  })
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
  req.checkBody('username', 'Username cannot be empty').notEmpty();
  req.checkBody('phone', 'Phone number cannot be empty').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function(error) {
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  User.findOne({'email': email}, function(err, user) {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, false, {message: 'Email is already in use.'});
    }
    var newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.username = req.body.username;
    newUser.phone = req.body.phone;
    newUser.save(function(err, result) {
      if(err) {
        return done(err);
      }
      return done(null, newUser);
    });
  });
}));

passport.use('local.signin', new LocalStrategy( {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function(error) {
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  User.findOne({'email': email}, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {message: 'No user found.'});
    }
    if (!user.validPassword(password)) {
      return done(null, false, {message: 'Wrong password'});
    }
    return done(null, user);
  });
}));

passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['id', 'displayName', 'picture.type(large)', 'email', 'friends']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({'facebook.id': profile.id}, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          user.facebook = {
            id: profile.id,
            token: accessToken,
            name: profile.displayName,
            profilePic: profile.photos[0].value,
            email: profile.emails[0].value,
            friends: profile._json.friends.data
          }
          user.save(function(err, updatedUser) {
            if (err) {
              throw err;
            }
            return done(null, user);
          });
        }
        else {
          var newUser = new User({
            facebook: {
              id: profile.id,
              token: accessToken,
              name: profile.displayName,
              profilePic: profile.photos[0].value,
              email: profile.emails[0].value,
              friends: profile._json.friends.data
            }
          });

          newUser.save(function(err) {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }
));
