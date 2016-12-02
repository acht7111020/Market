var express = require('express');
var router = express.Router();
var multer = require('multer');
var User = require('../models/user-schema');
var Product = require('../models/product-schema');

var upload = multer({dest: 'public/uploads/'});

router.get('/', isLoggedIn, function(req, res, next) {
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

router.post('/modify', upload.any(), function(req, res, next) {
  res.redirect('/');
});

router.get('/product', isLoggedIn, function(req, res, next) {
  res.render('store/product', {
    username: req.user.username,
    userEmail: req.user.email,
    friends: req.friends,
    title: "Ballon"
  });
});

router.get('/modify', isLoggedIn, function(req, res, next) {
  res.render('store/modify', {
    username: req.user.username,
    userEmail: req.user.email,
    friends: req.friends,
    title: "Ballon"
  });
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
      req.friends = docs;
      return next();
    });
  }
  else {
    res.redirect('/');
  }
}
