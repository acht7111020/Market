var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user){
    User.find(function(err, docs) {
      var index = docs.map(function(item) {
        return item.username;
      }).indexOf(req.user.username);
      docs.splice(index, 1);
      res.render('index', {username: req.user.username, useremail: req.user.email, friends: docs});
    })
  }
  else {
    res.render('index', {});
  }
});

module.exports = router;
