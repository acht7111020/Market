var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/products');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
var upload = multer({ storage: storage});

var RoutesLogic = require('../config/routes-logic');
var Product = require('../models/product-schema');
var CartManager = require('../helpers/cart-manager');
var ModifyProduct = require('../helpers/modify-product-manager');

router.get('/:productId', RoutesLogic, function(req, res) {
  Product.findById(req.params.productId, function(err, product) {
    if (err) res.redirect('/');
    else {
      req.renderValues.product = product;
      res.render('product/product', req.renderValues);
    }
  });
});

router.get('/add-to-cart/:productId', RoutesLogic, function(req, res, next) {
  Product.findById(req.params.productId, function(err, product) {
    if (err) res.redirect('/');
    else {
      // console.log(req.user._id);
      var cartManager = new CartManager(req.user._id);
      cartManager.add(product);
      res.redirect(`/product/${req.params.productId}`);
    }
  });
});

router.get('/add/:storeId', RoutesLogic, function(req, res) {
  res.render('product/modify', req.renderValues);
});

router.post('/add/:storeId', RoutesLogic, upload.array('photos', 5), function(req, res) {
  var modifyProduct = new ModifyProduct();
  modifyProduct.add(req.body, req.files, req.params.storeId);
  res.redirect(`/store/${req.params.storeId}`);
});

router.get('/modify/:productId', RoutesLogic, function(req, res) {
  Product.findById(req.params.productId, function(err, product) {
    if (err) res.redirect('/');
    if (!product) res.redirect('/');
    else {
      req.renderValues.product = product;
      res.render('product/modify', req.renderValues);
    }
  });
});

router.post('/modify/:productId', RoutesLogic, upload.array('photos', 5), function(req, res) {
  var modifyProduct = new ModifyProduct();
  modifyProduct.modify(req.body, req.files, req.params.productId);
  Product.findById(req.params.productId, function(err, product) {
    if (err) res.redirect('/');
    if (!product) res.redirect('/');
    else res.redirect(`/store/${product.ownerStore}`);
  });
});

module.exports = router;
