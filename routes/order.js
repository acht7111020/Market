var express = require('express');
var router = express.Router();
var User = require('../models/user-schema');
var Cart = require('../models/cart-schema');

router.get('/cart', isLoggedIn, function(req, res, next) {
  Cart.findOne({fb_id: req.renderValues.fb_user.id}, function(err, doc) {
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
    req.renderValues = {
      title: "Ballon",
      fb_user: req.user.facebook
    }
    return next();
  }
  else {
    res.redirect('/');
  }
}
