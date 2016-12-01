var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user-schema');


/* GET home page. */
router.get('/', findFriends, function(req, res, next) {
  if (req.user){
    res.render('index', {username: req.user.username, userEmail: req.user.email, friends: req.friends, title: "Ballon"});
  }
  else {
    res.render('index', {title: "Ballon"});
  }
});

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
