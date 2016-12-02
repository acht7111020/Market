var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user-schema');


/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', req.renderValues);
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    User.find(function(err, docs) {
      if (err) res.redirect('/');
      var index = docs.map(function(item) {
        return item.username;
      }).indexOf(req.user.username);
      docs.splice(index, 1);
      req.renderValues = {
        title: "Ballon",
        username: req.user.username,
        userEmail: req.user.email,
        friends: docs
      };
      return next();
    });
  }
  else {
    res.render('index', {title: "Ballon"});
  }
}
