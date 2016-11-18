var express = require('express');
var router = express.Router();
var User = require('../models/user-schema');

router.get('/', function(req, res, next) {
  User.find(function(err, docs) {
    var index = docs.map(function(item) {
      return item.username;
    }).indexOf(req.user.username);
    docs.splice(index, 1);
    res.render('store/store', {username: req.user.username, useremail: req.user.email, friends: docs, title: "Ballon"});
  })
});

module.exports = router;
