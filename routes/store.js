var express = require('express');
var router = express.Router();
var User = require('../models/user-schema');
var Product = require('../models/product-schema');

router.get('/', isLoggedIn, function(req, res, next) {
  User.find(function(userErr, userDocs) {
    if (userErr) throw userErr;
    var index = userDocs.map(function(item) {
      return item.username;
    }).indexOf(req.user.username);
    userDocs.splice(index, 1);
    var findQuery = Product.find();
    findQuery.sort('position').exec(function(productErr, productDocs){
      if(productErr) throw productErr;
      console.log(productDocs);
      res.render('store/store', {
        username: req.user.username,
        useremail: req.user.email,
        friends: userDocs,
        title: "Ballon",
        products: productDocs
      });
    });
  })
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
