var express = require('express');
var router = express.Router();

var RoutesLogic = require('../config/routes-logic');
var User = require('../models/user-schema');
var Product = require('../models/product-schema');
var Store = require('../models/store-schema');

router.get('/:id', RoutesLogic, function(req, res, next) {
  var findProductQuery = Product.find({ownerStore: req.params.id});
  findProductQuery.sort('position').exec(function(productErr, productDocs){
    if(productErr) {
      res.redirect('/');
    }
    else {
      Store.findById(req.params.id, function(storeErr, store) {
        if (storeErr) throw storeErr;
        req.renderValues.products = productDocs;
        req.renderValues.storeId = req.params.id;
        req.renderValues.leftbarImg = store.detail.coverImage;
        req.renderValues.leftbarTitle = store.detail.title;
        req.renderValues.leftbarAbout = req.params.id;
        res.render('store/store', req.renderValues);
      });
    }
  });
});

router.get('/about/:storeID', RoutesLogic, function(req, res) {
  Store.findById(req.params.storeID, function(storeErr, store) {
    if (storeErr) throw storeErr;
    if (store) {
      User.findOne({'facebook.id': store.detail.owner}, function(userErr, user) {
        if (userErr) throw userErr;
        if (user) {
          req.renderValues.store = store;
          req.renderValues.owner = user.facebook;
          req.renderValues.rating = ['#ED8A19', '#ED8A19', '#ED8A19', '#ED8A19', '#bdbdbd'];
          res.render('store/about', req.renderValues);
        }
        else {
          res.redirect('/');
        }
      });
    }
    else {
      res.redirect('/');
    }
  });
});

module.exports = router;
