var express = require('express');
var router = express.Router();
var User = require('../models/user-schema');
var Cart = require('../models/cart-schema');
var Product = require('../models/product-schema');
var RoutesLogic = require('../config/routes-logic');
var CartManager = require('../helpers/cart-manager');

router.get('/cart', RoutesLogic, function(req, res, next) {
  Cart.findOne({userId: req.user._id}, function(err, cart) {
    if (err) res.redirect('/');
    if (!cart) res.redirect('/');
    else {
      var itemIds = [];
      for (var item in cart.items){
        itemIds.push({_id: item});
      }
      Product.find({$or: itemIds}, function(err, products) {
        cart.totalPrice = 0;
        for (i = 0; i < products.length; i++) {
          cart.items[products[i]._id].item = products[i];
          cart.items[products[i]._id].price = products[i].price * cart.items[products[i]._id].qty;
          cart.totalPrice += cart.items[products[i]._id].price;
        }
        req.renderValues.cart = cart;
        res.render('order/cart', req.renderValues);
      });
    }
  });
});

module.exports = router;
