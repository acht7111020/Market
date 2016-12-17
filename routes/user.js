var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../models/user-schema');

var csrfProtection = csrf();

router.use(csrfProtection);

router.get('/logout', isLoggedIn, function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.get('/profile/:id', isLoggedIn, function(req, res) {
  User.findOne({'facebook.id': req.params.id}, function(err, user) {
    if(err) throw err;
    // req.renderValues.leftbarImg = user.facebook.profilePic;
    // req.renderValues.leftbarTitle = user.facebook.name;
    res.render('user/profile', req.renderValues);
  });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    req.renderValues = {
      title: "Ballon",
      fb_user: req.user.facebook
    }
    return next();
  }
  else {
    res.redirect('/');
  }
}
