var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/stores');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
var upload = multer({ storage: storage});

var RoutesLogic = require('../config/routes-logic');
var User = require('../models/user-schema');
var Product = require('../models/product-schema');
var Store = require('../models/store-schema');
var ModifyStore = require('../helpers/modify-store-manager');

router.get('/:storeId', RoutesLogic, function(req, res, next) {
  Store.findById(req.params.storeId, function(storeErr, store) {
    if (storeErr) res.redirect('/');
    else if (!store) res.redirect('/');
    else if(store.status.level != req.session.level) res.redirect('/');
    else {
      Product.find({ownerStore: req.params.storeId}, function(productErr, products) {
        if(productErr) res.redirect('/');
        else if (!products) res.redirect('/');
        else {
          req.renderValues.products = products;
          req.session.storeId = req.params.storeId;
          req.renderValues.storeId = req.session.storeId;
          req.renderValues.storeState = "in";
          req.renderValues.leftbarImg = store.detail.coverImage;
          req.renderValues.leftbarTitle = store.detail.title;
          req.renderValues.leftbarAbout = req.params.storeId;
          res.render('store/store', req.renderValues);
        }
      });
    }
  });
});

router.get('/about/:storeId', RoutesLogic, function(req, res) {
  Store.findById(req.params.storeId, function(storeErr, store) {
    if (storeErr) res.redirect('/');
    if (!store) res.redirect('/');
    else {
      User.findById(store.detail.owner, function(userErr, user) {
        if (userErr) res.redirect('/');
        if (!user) res.redirect('/');
        else {
          req.renderValues.store = store;
          req.renderValues.storeId = req.session.storeId;
          req.renderValues.storeState = "in";
          req.renderValues.owner = user.facebook;
          req.renderValues.rating = ['#ED8A19', '#ED8A19', '#ED8A19', '#ED8A19', '#bdbdbd'];
          res.render('store/about', req.renderValues);
        }
      });
    }
  });
});

router.get('/rent/:storeId', RoutesLogic, function(req, res) {
  res.render('store/modify', req.renderValues);
});

router.post('/rent/:storeId', RoutesLogic, upload.fields([{ name: 'mainImage', maxCount: 1}, { name: 'minorImage', maxCount: 1}]), function(req, res) {
  var modifyStore = new ModifyStore();
  modifyStore.modify(req.body, req.files, req.params.storeId, req.user);
  res.redirect('/');
});

router.get('/modify/:storeId', RoutesLogic, function(req, res) {
  Store.findById(req.params.storeId, function(err, store) {
    if (err) res.redirect('/');
    else if (!store) res.redirect('/');
    else if (store.detail.owner != req.user._id) res.redirect('/');
    else {
      req.renderValues.store = store;
      res.render('store/modify', req.renderValues);
    }
  });
});

router.post('/modify/:storeId', RoutesLogic, upload.fields([{ name: 'mainImage', maxCount: 1}, { name: 'minorImage', maxCount: 1}]), function(req, res) {
  // console.log(req.files);
  var modifyStore = new ModifyStore();
  modifyStore.modify(req.body, req.files, req.params.storeId, req.user);
  res.redirect('/');
});

module.exports = router;
