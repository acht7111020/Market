var express = require('express');
var router = express.Router();
var User = require('../models/user-schema');
var Cart = require('../models/cart-schema');
var RoutesLogic = require('../config/routes-logic');

router.get('/cart', RoutesLogic, function(req, res, next) {
  Cart.findOne({fb_id: req.renderValues.fb_user.id}, function(err, doc) {
    if (err) throw err;
    req.renderValues.cart = doc;
    console.log(req.renderValues.cart);
    res.render('order/cart', req.renderValues);
  });
});

module.exports = router;
