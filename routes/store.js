var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
var upload = multer({ storage: storage});

var User = require('../models/user-schema');
var Product = require('../models/product-schema');
var CartManager = require('../models/cart-manager');
var ModifyProduct = require('../models/modify-product');

router.get('/:id', isLoggedIn, function(req, res, next) {
  var findProductQuery = Product.find({ownerStore: req.params.id});
  findProductQuery.sort('position').exec(function(productErr, productDocs){
    if(productErr) {
      res.redirect('/');
    }
    else {
      req.renderValues.products = productDocs;
      req.renderValues.storeID = req.params.id;
      res.render('store/store', req.renderValues);
    }
  });
});

router.get('/product/:id', isLoggedIn, function(req, res, next) {
  Product.findById(req.params.id, function(err, doc) {
    if (err) {
      res.redirect('/');
    }
    else {
      req.renderValues.product = doc;
      res.render('store/product', req.renderValues);
    }
  });
});

router.get('/product/add-to-cart/:id', isLoggedIn, function(req, res, next) {
  Product.findById(req.params.id, function(err, doc) {
    if (err) {
      res.redirect('/');
    };
    req.renderValues.product = doc;
    var cartManager = new CartManager(req.renderValues.fb_user.id);
    cartManager.add(doc);
    res.redirect(`/store/product/${req.params.id}`);
  });
});

router.get('/add-product/:storeID', isLoggedIn, function(req, res, next) {
  res.render('store/modify', req.renderValues);
});

router.post('/add-product/:storeID', isLoggedIn, upload.array('photos', 5), function(req, res, next) {
  var modifyProduct = new ModifyProduct();
  modifyProduct.add(req.body, req.files, req.params.storeID);
  res.redirect(`/store/${req.params.storeID}`);
});

router.get('/modify-product/:productID', isLoggedIn, function(req, res) {
  Product.findById(req.params.productID, function(err, doc) {
    if (err) {
      res.redirect('/');
    }
    else {
      req.renderValues.product = doc;
      res.render('store/modify', req.renderValues);
    }
  });
});

router.post('/modify-product/:productID', isLoggedIn, upload.array('photos', 5), function(req, res) {
  var modifyProduct = new ModifyProduct();
  var storeID = modifyProduct.modify(req.body, req.files, req.params.productID);
  Product.findById(req.params.productID, function(err, doc) {
    if (err) {
      res.redirect('/');
    }
    else {
      res.redirect(`/store/${doc.ownerStore}`);
    }
  })
  // res.redirect
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
