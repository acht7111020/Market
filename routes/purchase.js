var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user-schema');
var Store = require('../models/store-schema');
var PurchaseManager = require('../models/purchase-manager');
/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  if (req.user){
    User.find(function(err, docs) {
      var index = docs.map(function(item) {
        return item.username;
      }).indexOf(req.user.username);
      docs.splice(index, 1);
      var findQuery = Store.find();
      findQuery.sort('position').exec(function(storeErr, storeDocs){
        if(storeErr) throw storeErr;
        req.renderValues.stores = storeDocs;
        res.render('purchase/purchase', req.renderValues);
      });
    });
  }
  else {
    res.render('index', {title: "Ballon_unlog"});
  }
});

router.get('/buying-store/:id', isLoggedIn, function(req, res, next) {
  Store.findById(req.params.id, function(err, doc) {
    if (err) {
      res.redirect('/');
    };
    req.renderValues.product = doc;
    var purchaseManager = new PurchaseManager(req.params.id, req.user.username);
    purchaseManager.add(doc);
    res.redirect('/purchase');
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
