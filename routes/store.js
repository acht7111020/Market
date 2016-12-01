var express = require('express');
var router = express.Router();
var User = require('../models/user-schema');
var Product = require('../models/product-schema');

router.get('/', isLoggedIn, findFriends, function(req, res, next) {
  var findQuery = Product.find();
  findQuery.sort('position').exec(function(productErr, productDocs){
    if(productErr) throw productErr;
    res.render('store/store', {
      username: req.user.username,
      userEmail: req.user.email,
      friends: req.friends,
      title: "Ballon",
      products: productDocs
    });
  });
});

router.get('/products', isLoggedIn, function(req, res, next) {
  res.render('index');
});

router.get('/product', isLoggedIn, function(req, res, next) {
  res.render('store/product');
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

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
