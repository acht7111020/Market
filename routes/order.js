var express = require('express');
var router = express.Router();
var User = require('../models/user-schema');
var Cart = require('../models/cart-schema');

router.get('/cart', isLoggedIn, function(req, res, next) {
  Cart.findOne({userEmail: req.renderValues.userEmail}, function(err, doc) {
    if (err) throw err;
    // console.log(req.renderValues.userEmail);
    req.renderValues.cart = doc;
    console.log(req.renderValues.cart);
    res.render('order/cart', req.renderValues);
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
