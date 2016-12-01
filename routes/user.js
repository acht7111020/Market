var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../models/user-schema');

var csrfProtection = csrf();

router.use(csrfProtection);

router.get('/profile', isLoggedIn, findFriends, function(req, res, next) {
  res.render('index', {username: req.user.username, userEmail: req.user.email, friends: req.friends, title: "Ballon"});
});

router.get('/logout', isLoggedIn, function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
  next();
});
router.get('/signup', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0, title: "Ballon"});
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));


router.get('/signin', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0, title: "Ballon"});
});


router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));

module.exports = router;

function findFriends(req, res, next) {
  User.find(function(err, docs) {
    if (err) res.redirect('/');
    var index = docs.map(function(item) {
      return item.username;
    }).indexOf(req.user.username);
    docs.splice(index, 1);
    req.friends = docs;
    return next();
  });
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
