var express = require('express');
var router = express.Router();
var User = require('../models/user-schema');
var Product = require('../models/product-schema');

router.get('/', isLoggedIn, function(req, res, next) {
  var findQuery = Product.find();
  findQuery.sort('position').exec(function(productErr, productDocs){
    if(productErr) throw productErr;
    req.renderValues.products = productDocs;
    res.render('store/store', req.renderValues);
  });
});

router.get('/product/:id', isLoggedIn, function(req, res, next) {
  Product.findOne({_id: req.params.id}, function(err, docs) {
    if (err) throw err;
    req.renderValues.product = docs;
    res.render('store/product', req.renderValues);
  });
});

router.get('/modify', isLoggedIn, function(req, res, next) {
  res.render('store/modify', req.renderValues);
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
    res.redirect('/');
  }
}
