var express = require('express');
var router = express.Router();
var User = require('../models/user-schema');
var Store = require('../models/store-schema');
var expressHbs = require('express-handlebars');

router.get('/', isLoggedIn, function(req, res, next) {
  var findQuery = Store.find();
  findQuery.sort('position').exec(function(storeErr, storeDocs) {
    req.renderValues.stores = storeDocs;
    res.render('index', req.renderValues);
  });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.user.facebook.friends);
    req.renderValues = {
      title: "Ballon",
      fb_user: req.user.facebook
    }
    return next();
    // User.find(function(err, docs) {
    //   if (err) res.redirect('/');
    //   var index = docs.map(function(item) {
    //     return item.username;
    //   }).indexOf(req.user.username);
    //   docs.splice(index, 1);
    //   req.renderValues = {
    //     title: "Ballon",
    //     username: req.user.username,
    //     userEmail: req.user.email,
    //     friends: docs
    //   };
    //   return next();
    // });
  }
  else {
    res.render('index', {title: "Ballon"});
  }
}
